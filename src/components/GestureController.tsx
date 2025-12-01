import React, { useEffect, useRef, useState } from 'react';
import { Hands, Results } from '@mediapipe/hands';
import { Camera } from '@mediapipe/camera_utils';
import { useLanguage } from '../contexts/LanguageContext';

interface GestureControllerProps {
  onGesture: (type: 'IDLE' | 'PAN' | 'ZOOM', delta: { x: number, y: number, scale: number }) => void;
}

type GestureType = 'IDLE' | 'OPEN' | 'FIST' | 'PINCH';

export const GestureController: React.FC<GestureControllerProps> = ({ onGesture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [gestureState, setGestureState] = useState<GestureType>('IDLE');
  
  const lastHandPos = useRef<{ x: number, y: number } | null>(null);
  const smoothedPos = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
  const { t, language } = useLanguage();

  useEffect(() => {
    if (!videoRef.current) return;

    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      }
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    hands.onResults(onResults);

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        if (videoRef.current) {
          await hands.send({ image: videoRef.current });
        }
      },
      width: 320,
      height: 240
    });

    if (cameraActive) {
      camera.start();
    }

    return () => {
      // camera.stop(); 
    };
  }, [cameraActive]);

  const detectGesture = (landmarks: any[]): GestureType => {
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const pinchDist = Math.hypot(thumbTip.x - indexTip.x, thumbTip.y - indexTip.y);
    
    // Fist detection (Check if fingers are folded towards wrist)
    // Priority: FIST > PINCH > OPEN
    let foldedCount = 0;
    const tips = [8, 12, 16, 20]; // Index, Middle, Ring, Pinky tips
    const mcps = [5, 9, 13, 17];   // MCP joints (knuckles)
    const wrist = landmarks[0];

    tips.forEach((tipIdx, i) => {
        const tip = landmarks[tipIdx];
        const mcp = landmarks[mcps[i]];
        const distTip = Math.hypot(tip.x - wrist.x, tip.y - wrist.y);
        const distMcp = Math.hypot(mcp.x - wrist.x, mcp.y - wrist.y);
        // If tip is closer to wrist than knuckle, it's folded
        // Stricter threshold for FIST to avoid false positives during PINCH
        if (distTip < distMcp) foldedCount++; 
    });

    // Check thumb for FIST as well
    const thumbMcp = landmarks[2];
    const distThumbTip = Math.hypot(thumbTip.x - wrist.x, thumbTip.y - wrist.y);
    const distThumbMcp = Math.hypot(thumbMcp.x - wrist.x, thumbMcp.y - wrist.y);
    const thumbFolded = distThumbTip < distThumbMcp * 1.2; // Thumb is shorter, slightly looser check

    // If all 4 fingers are folded, it's definitely a FIST (Zoom Out)
    if (foldedCount === 4) return 'FIST';
    
    // If 3 fingers folded and thumb is folded, likely FIST
    if (foldedCount >= 3 && thumbFolded) return 'FIST';

    // Pinch detection (Zoom/Rotate)
    // Only if not a fist
    if (pinchDist < 0.08) return 'PINCH';

    return 'OPEN';
  };

  const onResults = (results: Results) => {
    if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
      lastHandPos.current = null;
      setGestureState('IDLE');
      onGesture('IDLE', { x: 0, y: 0, scale: 0 });
      return;
    }

    const landmarks = results.multiHandLandmarks[0];
    const gesture = detectGesture(landmarks);
    setGestureState(gesture);

    // Smooth position (Low-pass filter)
    // Center of palm (approx using index MCP or average)
    const rawX = landmarks[9].x;
    const rawY = landmarks[9].y;
    
    // Initialize if first frame
    if (smoothedPos.current.x === 0 && smoothedPos.current.y === 0) {
        smoothedPos.current = { x: rawX, y: rawY };
    }

    // Smoothing factor (0.2 means 20% new value, 80% old value - very smooth but laggy. 
    // 0.5 is balanced. Let's try 0.3 for stability)
    const alpha = 0.3;
    smoothedPos.current.x = smoothedPos.current.x * (1 - alpha) + rawX * alpha;
    smoothedPos.current.y = smoothedPos.current.y * (1 - alpha) + rawY * alpha;

    const cx = smoothedPos.current.x;
    const cy = smoothedPos.current.y;

    if (gesture === 'OPEN') {
        // Zoom In (Dolly In) -> Negative scale
        onGesture('ZOOM', { x: 0, y: 0, scale: -0.02 });
        lastHandPos.current = null;
    } else if (gesture === 'FIST') {
        // Zoom Out (Dolly Out) -> Positive scale
        onGesture('ZOOM', { x: 0, y: 0, scale: 0.02 });
        lastHandPos.current = null;
    } else if (gesture === 'PINCH') {
        // Pan / Rotate
        if (lastHandPos.current) {
            // Invert X for natural feel (drag left to rotate right)
            const dx = (cx - lastHandPos.current.x) * 5; 
            const dy = (cy - lastHandPos.current.y) * 5;
            
            // Deadzone to prevent jitter when holding still
            if (Math.abs(dx) > 0.0005 || Math.abs(dy) > 0.0005) {
                onGesture('PAN', { x: dx, y: dy, scale: 0 });
            }
        }
        lastHandPos.current = { x: cx, y: cy };
    } else {
        lastHandPos.current = null;
    }
  };

  const getGestureLabel = (gesture: GestureType) => {
      if (language === 'zh') {
          switch (gesture) {
              case 'OPEN': return '放大';
              case 'FIST': return '缩小';
              case 'PINCH': return '捏合拖动旋转';
              default: return '空闲';
          }
      }
      return gesture === 'PINCH' ? 'PINCH & DRAG' : gesture;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 border border-hologram-blue bg-black/50 p-2 rounded">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-orbitron text-hologram-blue">{t.gestureLink}</span>
        <button 
          onClick={() => setCameraActive(!cameraActive)}
          className={`w-3 h-3 rounded-full ${cameraActive ? 'bg-green-500' : 'bg-red-500'}`}
        />
      </div>
      <div className="relative">
        <video 
            ref={videoRef} 
            className={`w-32 h-24 object-cover transform scale-x-[-1] ${cameraActive ? 'opacity-50' : 'opacity-0'}`}
            playsInline
        />
        {cameraActive && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-hologram-blue font-orbitron font-bold text-lg drop-shadow-md bg-black/40 px-2 rounded">
                    {getGestureLabel(gestureState)}
                </span>
            </div>
        )}
      </div>
      <div className="text-[10px] text-gray-400 mt-1">
        {cameraActive ? t.gestureInstruction : t.cameraOff}
      </div>
    </div>
  );
};
