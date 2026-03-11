import React, { useEffect, useState, useRef } from 'react';
import './ModernLoader.scss';

interface ModernLoaderProps {
    onFinish: () => void;
}

const ModernLoader: React.FC<ModernLoaderProps> = ({ onFinish }) => {
    const [progress, setProgress] = useState(0);
    const [loadingText, setLoadingText] = useState('Initializing');
    const [dots, setDots] = useState('');
    const [tradingTip, setTradingTip] = useState('');
    const [lightningActive, setLightningActive] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Trading tips and motivational quotes
    const tradingTips = [
        'Building wealth through smart trading',
        'Your trusted partner in market success',
        'Professional trading strategies for everyone',
        'Precision trading, consistent results',
        'Quality execution in every trade',
        'Navigate markets with confidence',
        'Fast execution, reliable returns',
        'Growing your portfolio steadily',
        'State Fx - Your path to financial freedom',
        'Elevate your trading experience',
    ];

    // Bullish market-themed background animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Detect mobile device
        const isMobile = window.innerWidth <= 768;
        
        // Bullish market elements
        const candlesticks: Array<{
            x: number;
            y: number;
            height: number;
            width: number;
            isBullish: boolean;
            opacity: number;
            speed: number;
        }> = [];

        const trendLines: Array<{
            x1: number;
            y1: number;
            x2: number;
            y2: number;
            opacity: number;
            speed: number;
            color: string;
        }> = [];

        const priceArrows: Array<{
            x: number;
            y: number;
            size: number;
            opacity: number;
            speed: number;
            rotation: number;
        }> = [];

        // Green and gold colors for bullish theme
        const bullishColors = ['#00FF88', '#32CD32', '#00FA54', '#90EE90', '#FFD700', '#FFA500'];
        
        // Generate candlesticks
        const candlestickCount = isMobile ? 20 : 40;
        for (let i = 0; i < candlestickCount; i++) {
            candlesticks.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                height: Math.random() * 60 + 20,
                width: Math.random() * 8 + 4,
                isBullish: Math.random() > 0.3, // 70% bullish candles
                opacity: Math.random() * 0.6 + 0.2,
                speed: Math.random() * 2 + 1,
            });
        }

        // Generate upward trend lines
        const trendLineCount = isMobile ? 8 : 15;
        for (let i = 0; i < trendLineCount; i++) {
            const startX = Math.random() * canvas.width;
            const startY = canvas.height * 0.7 + Math.random() * canvas.height * 0.3;
            trendLines.push({
                x1: startX,
                y1: startY,
                x2: startX + Math.random() * 200 + 100,
                y2: startY - Math.random() * 150 - 50, // Always going up
                opacity: Math.random() * 0.8 + 0.3,
                speed: Math.random() * 1.5 + 0.5,
                color: bullishColors[Math.floor(Math.random() * bullishColors.length)],
            });
        }

        // Generate upward arrows
        const arrowCount = isMobile ? 15 : 30;
        for (let i = 0; i < arrowCount; i++) {
            priceArrows.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 20 + 10,
                opacity: Math.random() * 0.7 + 0.3,
                speed: Math.random() * 3 + 1,
                rotation: 0, // Pointing up
            });
        }

        // Dollar signs floating up
        const dollarSigns: Array<{
            x: number;
            y: number;
            size: number;
            opacity: number;
            speed: number;
            rotation: number;
        }> = [];

        const dollarCount = isMobile ? 10 : 20;
        for (let i = 0; i < dollarCount; i++) {
            dollarSigns.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 30 + 15,
                opacity: Math.random() * 0.5 + 0.2,
                speed: Math.random() * 2 + 1,
                rotation: Math.random() * 360,
            });
        }

        const draw = () => {
            // Bullish gradient background (dark green to gold)
            const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            bgGradient.addColorStop(0, 'rgba(0, 20, 10, 0.98)');
            bgGradient.addColorStop(0.5, 'rgba(0, 30, 15, 0.98)');
            bgGradient.addColorStop(1, 'rgba(10, 25, 5, 0.98)');
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw grid for trading chart feel
            ctx.globalAlpha = 0.1;
            ctx.strokeStyle = '#00FF88';
            ctx.lineWidth = 0.5;

            const gridSpacing = isMobile ? 60 : 50;
            // Vertical grid lines
            for (let x = 0; x < canvas.width; x += gridSpacing) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }

            // Horizontal grid lines
            for (let y = 0; y < canvas.height; y += gridSpacing) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            ctx.globalAlpha = 1;

            // Draw candlesticks
            candlesticks.forEach(candle => {
                ctx.globalAlpha = candle.opacity;
                
                if (candle.isBullish) {
                    ctx.fillStyle = '#00FF88';
                    ctx.strokeStyle = '#00FF88';
                } else {
                    ctx.fillStyle = '#FF4444';
                    ctx.strokeStyle = '#FF4444';
                }

                // Draw candle body
                ctx.fillRect(candle.x - candle.width/2, candle.y, candle.width, candle.height);
                
                // Draw wicks
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(candle.x, candle.y - 10);
                ctx.lineTo(candle.x, candle.y + candle.height + 10);
                ctx.stroke();

                // Move candles slowly upward (bullish movement)
                candle.y -= candle.speed * 0.5;
                candle.x += (Math.random() - 0.5) * 0.5; // Slight horizontal drift

                // Reset when off screen
                if (candle.y < -candle.height - 20) {
                    candle.y = canvas.height + 20;
                    candle.x = Math.random() * canvas.width;
                    candle.isBullish = Math.random() > 0.3; // Keep 70% bullish
                }
            });

            // Draw trend lines
            trendLines.forEach(line => {
                ctx.globalAlpha = line.opacity;
                ctx.strokeStyle = line.color;
                ctx.lineWidth = 2;
                ctx.shadowBlur = 10;
                ctx.shadowColor = line.color;

                ctx.beginPath();
                ctx.moveTo(line.x1, line.y1);
                ctx.lineTo(line.x2, line.y2);
                ctx.stroke();

                // Draw arrow at end of trend line
                const angle = Math.atan2(line.y2 - line.y1, line.x2 - line.x1);
                const arrowLength = 15;
                
                ctx.beginPath();
                ctx.moveTo(line.x2, line.y2);
                ctx.lineTo(
                    line.x2 - arrowLength * Math.cos(angle - Math.PI / 6),
                    line.y2 - arrowLength * Math.sin(angle - Math.PI / 6)
                );
                ctx.moveTo(line.x2, line.y2);
                ctx.lineTo(
                    line.x2 - arrowLength * Math.cos(angle + Math.PI / 6),
                    line.y2 - arrowLength * Math.sin(angle + Math.PI / 6)
                );
                ctx.stroke();

                // Move trend lines
                line.x1 -= line.speed;
                line.x2 -= line.speed;

                // Reset when off screen
                if (line.x2 < 0) {
                    line.x1 = canvas.width + Math.random() * 100;
                    line.x2 = line.x1 + Math.random() * 200 + 100;
                    line.y1 = canvas.height * 0.7 + Math.random() * canvas.height * 0.3;
                    line.y2 = line.y1 - Math.random() * 150 - 50;
                    line.color = bullishColors[Math.floor(Math.random() * bullishColors.length)];
                }
            });

            ctx.shadowBlur = 0;

            // Draw upward arrows
            priceArrows.forEach(arrow => {
                ctx.globalAlpha = arrow.opacity;
                ctx.fillStyle = '#FFD700';
                ctx.strokeStyle = '#FFD700';
                ctx.lineWidth = 2;

                ctx.save();
                ctx.translate(arrow.x, arrow.y);
                ctx.rotate(arrow.rotation);

                // Draw upward arrow
                ctx.beginPath();
                ctx.moveTo(0, -arrow.size);
                ctx.lineTo(-arrow.size * 0.5, 0);
                ctx.lineTo(-arrow.size * 0.2, 0);
                ctx.lineTo(-arrow.size * 0.2, arrow.size * 0.5);
                ctx.lineTo(arrow.size * 0.2, arrow.size * 0.5);
                ctx.lineTo(arrow.size * 0.2, 0);
                ctx.lineTo(arrow.size * 0.5, 0);
                ctx.closePath();
                ctx.fill();

                ctx.restore();

                // Move arrows upward
                arrow.y -= arrow.speed;
                arrow.x += (Math.random() - 0.5) * 0.5;

                // Reset when off screen
                if (arrow.y < -arrow.size) {
                    arrow.y = canvas.height + arrow.size;
                    arrow.x = Math.random() * canvas.width;
                }
            });

            // Draw floating dollar signs
            dollarSigns.forEach(dollar => {
                ctx.globalAlpha = dollar.opacity;
                ctx.fillStyle = '#FFD700';
                ctx.font = `${dollar.size}px Arial`;
                ctx.textAlign = 'center';
                ctx.shadowBlur = 5;
                ctx.shadowColor = '#FFD700';

                ctx.save();
                ctx.translate(dollar.x, dollar.y);
                ctx.rotate(dollar.rotation * Math.PI / 180);
                ctx.fillText('$', 0, 0);
                ctx.restore();

                // Float upward
                dollar.y -= dollar.speed;
                dollar.rotation += 1;

                // Reset when off screen
                if (dollar.y < -dollar.size) {
                    dollar.y = canvas.height + dollar.size;
                    dollar.x = Math.random() * canvas.width;
                    dollar.rotation = Math.random() * 360;
                }
            });

            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
        };

        const interval = setInterval(draw, 33);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Select random tip
        const randomTip = tradingTips[Math.floor(Math.random() * tradingTips.length)];
        setTradingTip(randomTip);

        // Multi-phase loading system
        const loadingPhases = [
            { duration: 1000, text: 'Initializing Platform', progress: 15 },
            { duration: 800, text: 'Loading Market Data', progress: 30 },
            { duration: 1200, text: 'Connecting to Markets', progress: 50 },
            { duration: 900, text: 'Activating Trading Signals', progress: 70 },
            { duration: 700, text: 'Loading Strategies', progress: 85 },
            { duration: 600, text: 'Preparing Dashboard', progress: 95 },
            { duration: 500, text: 'Welcome to State Fx', progress: 100 },
        ];

        let currentPhase = 0;

        const executePhase = () => {
            if (currentPhase < loadingPhases.length) {
                const phase = loadingPhases[currentPhase];
                setLoadingText(phase.text);

                // Smooth progress animation
                const startProgress = progress;
                const targetProgress = phase.progress;
                const duration = phase.duration;
                const startTime = Date.now();

                const animateProgress = () => {
                    const elapsed = Date.now() - startTime;
                    const progressRatio = Math.min(elapsed / duration, 1);
                    const easeOutQuart = 1 - Math.pow(1 - progressRatio, 4);
                    const currentProgress = startProgress + (targetProgress - startProgress) * easeOutQuart;

                    setProgress(currentProgress);

                    if (progressRatio < 1) {
                        requestAnimationFrame(animateProgress);
                    } else {
                        currentPhase++;
                        if (currentPhase < loadingPhases.length) {
                            setTimeout(executePhase, 100);
                        } else {
                            setTimeout(onFinish, 800);
                        }
                    }
                };

                requestAnimationFrame(animateProgress);
            }
        };

        executePhase();

        // Dots animation
        let dotCount = 0;
        const dotInterval = setInterval(() => {
            dotCount = (dotCount + 1) % 4;
            setDots('.'.repeat(dotCount));
        }, 400);

        // Lightning strike effect
        const lightningInterval = setInterval(() => {
            setLightningActive(true);
            setTimeout(() => setLightningActive(false), 200);
        }, 2000);

        return () => {
            clearInterval(dotInterval);
            clearInterval(lightningInterval);
        };
    }, [onFinish]);

    return (
        <div className='modern-loader zeus-loader'>
            {/* Matrix-style falling money and code background */}
            <canvas ref={canvasRef} className='zeus-loader__matrix-canvas' />

            {/* Lightning flash overlay */}
            <div className={`zeus-loader__lightning-flash ${lightningActive ? 'active' : ''}`} />

            {/* Dark storm clouds background */}
            <div className='zeus-loader__storm-bg'>
                <div className='zeus-loader__cloud zeus-loader__cloud--1' />
                <div className='zeus-loader__cloud zeus-loader__cloud--2' />
                <div className='zeus-loader__cloud zeus-loader__cloud--3' />
            </div>

            {/* Main content */}
            <div className='zeus-loader__content'>
                {/* State Fx Logo - Company Logo */}
                <div className='zeus-loader__logo-container'>
                    <img 
                        src="/statefxlogo.png" 
                        alt="State Fx Logo" 
                        className='zeus-loader__logo company-logo'
                    />
                    <div className='zeus-loader__logo-glow' />
                    <div className='zeus-loader__logo-glow zeus-loader__logo-glow--secondary' />
                </div>

                {/* Zeus Lightning Bolt Icon */}
                <div className='zeus-loader__lightning-container' style={{ display: 'none' }}>
                    {/* Animated lightning bolt with intricate parts */}
                    <svg
                        className='zeus-loader__lightning-bolt'
                        viewBox='0 0 200 300'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <defs>
                            <linearGradient id='lightningGradient' x1='0%' y1='0%' x2='0%' y2='100%'>
                                <stop offset='0%' stopColor='#FFD700' />
                                <stop offset='50%' stopColor='#FFA500' />
                                <stop offset='100%' stopColor='#FF6B00' />
                            </linearGradient>
                            <filter id='glow'>
                                <feGaussianBlur stdDeviation='4' result='coloredBlur' />
                                <feMerge>
                                    <feMergeNode in='coloredBlur' />
                                    <feMergeNode in='SourceGraphic' />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Main lightning bolt */}
                        <path
                            className='zeus-loader__bolt-main'
                            d='M100 10 L80 100 L120 100 L90 180 L130 120 L100 120 L110 60 Z'
                            fill='url(#lightningGradient)'
                            filter='url(#glow)'
                        />

                        {/* Electric arcs - animated parts */}
                        <path
                            className='zeus-loader__bolt-arc zeus-loader__bolt-arc--1'
                            d='M85 50 Q70 60 75 80'
                            stroke='#4169E1'
                            strokeWidth='2'
                            fill='none'
                            opacity='0.8'
                        />
                        <path
                            className='zeus-loader__bolt-arc zeus-loader__bolt-arc--2'
                            d='M115 70 Q130 80 125 100'
                            stroke='#00BFFF'
                            strokeWidth='2'
                            fill='none'
                            opacity='0.8'
                        />
                        <path
                            className='zeus-loader__bolt-arc zeus-loader__bolt-arc--3'
                            d='M95 130 Q80 140 85 160'
                            stroke='#FFD700'
                            strokeWidth='2'
                            fill='none'
                            opacity='0.8'
                        />

                        {/* Energy particles */}
                        {[...Array(8)].map((_, i) => (
                            <circle
                                key={i}
                                className='zeus-loader__energy-particle'
                                cx={100 + Math.cos((i * Math.PI) / 4) * 40}
                                cy={100 + Math.sin((i * Math.PI) / 4) * 40}
                                r='3'
                                fill='#FFD700'
                                style={{ animationDelay: `${i * 0.1}s` }}
                            />
                        ))}

                        {/* Rotating energy ring */}
                        <circle
                            className='zeus-loader__energy-ring'
                            cx='100'
                            cy='100'
                            r='60'
                            fill='none'
                            stroke='#4169E1'
                            strokeWidth='2'
                            strokeDasharray='10 5'
                            opacity='0.5'
                        />
                    </svg>

                    {/* Pulsing glow effect */}
                    <div className='zeus-loader__lightning-glow' />
                    <div className='zeus-loader__lightning-glow zeus-loader__lightning-glow--secondary' />
                </div>

                {/* Brand name */}
                <h1 className='zeus-loader__brand'>
                    <span className='zeus-loader__brand-zeus'>STATE</span>
                    <span className='zeus-loader__brand-trading'>FX</span>
                </h1>

                <p className='zeus-loader__tagline'>Professional Trading Platform</p>

                {/* Loading text */}
                <div className='zeus-loader__text-container'>
                    <div className='zeus-loader__text'>
                        {loadingText}
                        {dots}
                    </div>
                </div>

                {/* Progress bar with electric effect */}
                <div className='zeus-loader__progress-container'>
                    <div className='zeus-loader__progress-label'>
                        <span>Power Level</span>
                        <span className='zeus-loader__progress-percentage'>{Math.round(Math.min(progress, 100))}%</span>
                    </div>
                    <div className='zeus-loader__progress-bar'>
                        <div className='zeus-loader__progress-fill' style={{ width: `${Math.min(progress, 100)}%` }}>
                            <div className='zeus-loader__progress-lightning' />
                        </div>
                    </div>
                </div>

                {/* Trading Tip */}
                <div className='zeus-loader__trading-tip'>
                    <div className='zeus-loader__tip-icon'>
                        <svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                            <defs>
                                <linearGradient id='iconGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
                                    <stop offset='0%' stopColor='#FFD700' />
                                    <stop offset='100%' stopColor='#FFA500' />
                                </linearGradient>
                            </defs>
                            {/* Mechanical gear icon */}
                            <circle cx='12' cy='12' r='3' fill='url(#iconGradient)' />
                            <path
                                d='M12 1L13.5 4.5L17 3L16 6.5L19.5 7.5L17.5 10.5L21 12L17.5 13.5L19.5 16.5L16 17.5L17 21L13.5 19.5L12 23L10.5 19.5L7 21L8 17.5L4.5 16.5L6.5 13.5L3 12L6.5 10.5L4.5 7.5L8 6.5L7 3L10.5 4.5L12 1Z'
                                fill='url(#iconGradient)'
                                opacity='0.6'
                            />
                            {/* Inner mechanical details */}
                            <circle cx='12' cy='12' r='5' fill='none' stroke='#FFD700' strokeWidth='0.5' />
                            <circle cx='12' cy='12' r='7' fill='none' stroke='#FFA500' strokeWidth='0.3' />
                        </svg>
                    </div>
                    <p className='zeus-loader__tip-text'>{tradingTip}</p>
                </div>
            </div>
        </div>
    );
};

export default ModernLoader;
