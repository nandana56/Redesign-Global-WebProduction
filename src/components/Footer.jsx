import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedinIn, FaEnvelope } from "react-icons/fa";

// ORIGINAL LOGO SVG CODE (from original Footer.jsx)
const LogoSVG = () => (
    <div className="relative w-[136px] h-[128px] transform scale-[0.8] origin-center lg:origin-left">
        <svg
            className="absolute top-[70px] left-[77px] -translate-x-1/2 -translate-y-1/2 scale-75 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 506.85 469.93"
        >
            <defs>
                <style>{`
                    .cls-1{fill:#fff}
                    .cls-3{fill:#EAF3F9}
                `}</style>
            </defs>
            <g>
                <g>
                    <g>
                        <path className="cls-1" d="M88.07,205.98c-.09-1.6-.21-2.87-.38-3.8h-41.69v16.85h21.61c-.13,1.9-.6,3.7-1.46,5.39-1.01,1.99-2.37,3.7-4.05,5.13-1.69,1.44-3.7,2.58-6.02,3.42-2.33.85-4.8,1.27-7.41,1.27-3.72,0-7.2-.7-10.45-2.09-3.25-1.39-6.06-3.29-8.42-5.7-2.37-2.41-4.23-5.26-5.58-8.55-1.35-3.29-2.03-6.84-2.03-10.64s.63-7.33,1.9-10.58c1.27-3.25,3.06-6.08,5.39-8.49,2.32-2.41,5.02-4.29,8.11-5.64,3.08-1.35,6.48-2.03,10.2-2.03,2.87,0,5.58.4,8.11,1.2,2.53.8,4.92,1.88,7.16,3.23,2.24,1.35,4.41,3.04,6.52,5.07l13.05-13.81c-2.45-2.87-5.45-5.41-9-7.6-3.55-2.2-7.5-3.93-11.85-5.2-4.35-1.27-8.98-1.9-13.88-1.9-6.93,0-13.33,1.14-19.2,3.42-5.87,2.28-10.96,5.49-15.27,9.63-4.31,4.14-7.63,8.98-9.95,14.51-2.33,5.53-3.48,11.59-3.48,18.18s1.1,12.69,3.29,18.31c2.2,5.62,5.36,10.5,9.5,14.64,4.14,4.14,9.08,7.35,14.82,9.63,5.74,2.28,12.16,3.42,19.26,3.42,5.91,0,11.4-.97,16.47-2.91,5.07-1.94,9.46-4.65,13.18-8.11,3.72-3.46,6.61-7.58,8.68-12.35,2.07-4.77,3.1-10.03,3.1-15.78,0-.76-.02-1.9-.06-3.42-.04-1.52-.11-3.08-.19-4.69Z" />
                        <polygon className="cls-1" points="123.67 163.28 102.13 163.28 102.13 251.98 163.21 251.98 163.21 232.97 123.67 232.97 123.67 163.28" />
                        <path className="cls-1" d="M247.34,174.3c-4.14-4.14-9-7.35-14.57-9.63-5.58-2.28-11.7-3.42-18.37-3.42s-12.8,1.14-18.37,3.42c-5.58,2.28-10.43,5.49-14.57,9.63-4.14,4.14-7.35,9-9.63,14.57-2.28,5.57-3.42,11.7-3.42,18.37s1.14,12.8,3.42,18.37c2.28,5.57,5.49,10.43,9.63,14.57,4.14,4.14,9,7.35,14.57,9.63,5.58,2.28,11.74,3.42,18.5,3.42s12.67-1.14,18.25-3.42c5.58-2.28,10.43-5.49,14.57-9.63,4.14-4.14,7.33-9.02,9.57-14.64,2.24-5.62,3.36-11.72,3.36-18.31s-1.12-12.8-3.36-18.37c-2.24-5.58-5.43-10.43-9.57-14.57ZM236.57,217.51c-1.18,3.13-2.85,5.85-5,8.17-2.16,2.32-4.69,4.12-7.6,5.39-2.92,1.27-6.11,1.9-9.57,1.9s-6.65-.63-9.57-1.9c-2.92-1.27-5.47-3.04-7.67-5.32-2.2-2.28-3.87-5.01-5-8.17-1.14-3.17-1.71-6.61-1.71-10.33s.57-7.14,1.71-10.26c1.14-3.12,2.81-5.85,5-8.17,2.2-2.32,4.75-4.12,7.67-5.39,2.91-1.27,6.1-1.9,9.57-1.9s6.65.63,9.57,1.9c2.91,1.27,5.45,3.06,7.6,5.39,2.15,2.32,3.82,5.05,5,8.17,1.18,3.13,1.77,6.55,1.77,10.26s-.59,7.14-1.77,10.26Z" />
                        <path className="cls-1" d="M337.25,206.87c-1.9-1.38-4.06-2.46-6.41-3.3,2.97-1.31,5.37-3.2,7.17-5.7,2.49-3.46,3.74-7.73,3.74-12.8,0-4.56-1.08-8.47-3.23-11.72-2.15-3.25-5.34-5.74-9.57-7.48-4.22-1.73-9.38-2.6-15.46-2.6h-39.15v88.7h40.42c4.65,0,8.89-.55,12.74-1.65,3.84-1.1,7.2-2.79,10.07-5.07s5.07-5.09,6.59-8.43c1.52-3.34,2.28-7.24,2.28-11.72,0-3.88-.8-7.37-2.41-10.45-1.61-3.08-3.87-5.68-6.78-7.79ZM294.61,181.27h15.08c3.72,0,6.5.78,8.37,2.34,1.86,1.56,2.79,3.7,2.79,6.4,0,1.86-.4,3.44-1.2,4.75-.8,1.31-1.99,2.33-3.55,3.04-1.56.72-3.44,1.08-5.64,1.08h-15.84v-17.61ZM323.88,229.49c-.93,1.48-2.22,2.6-3.87,3.36-1.65.76-3.66,1.14-6.02,1.14h-19.39v-19.01h18.75c2.45,0,4.56.36,6.34,1.08,1.77.72,3.15,1.75,4.12,3.1.97,1.35,1.46,3,1.46,4.94,0,2.11-.47,3.91-1.39,5.39Z" />
                        <path className="cls-1" d="M384.32,163.28l-35.1,88.7h21.29l6.33-16.98h32.47l6.31,16.98h21.79l-34.85-88.7h-18.25ZM382.89,218.78l4.35-11.66c.68-2.11,1.39-4.16,2.15-6.15.76-1.98,1.46-3.97,2.09-5.96.56-1.77,1.13-3.56,1.69-5.37.54,1.76,1.09,3.54,1.66,5.37.68,2.15,1.35,4.25,2.03,6.27.68,2.03,1.35,3.93,2.03,5.7l4.38,11.78h-20.39Z" />
                        <polygon className="cls-1" points="467.32 232.97 467.32 163.28 445.78 163.28 445.78 251.98 506.85 251.98 506.85 232.97 467.32 232.97" />
                    </g>
                    <g>
                        <path className="cls-3" d="M52.31,296.99c-.33,1.06-.58,1.89-.76,2.5-.18.61-.32,1.11-.4,1.49-.08.39-.16.78-.25,1.19-.02.09-.04.2-.06.29-.22-.82-.44-1.64-.71-2.46-.31-.95-.66-1.92-1.07-2.9l-7.44-19.28h-5.92l-7.69,19.28c-.16.45-.34.99-.55,1.62-.2.63-.48,1.54-.82,2.71-.11.39-.25.86-.39,1.36-.04-.24-.08-.44-.13-.69-.16-.89-.34-1.78-.55-2.65-.2-.87-.43-1.64-.67-2.29l-8.23-26.72h-7.02l13.6,42.7h4.45l10.64-25.94,10.96,25.94h4.57l13.61-42.7h-7.08l-8.11,26.53Z" />
                        <path className="cls-3" d="M98.21,284.85c-1.32-1.38-2.88-2.47-4.67-3.26-1.79-.79-3.72-1.19-5.79-1.19-2.36,0-4.55.42-6.56,1.25-2.01.83-3.74,2.01-5.19,3.54-1.44,1.52-2.57,3.32-3.39,5.4-.81,2.07-1.22,4.37-1.22,6.89,0,3.17.72,5.98,2.17,8.42,1.44,2.44,3.44,4.36,5.98,5.76,2.54,1.4,5.46,2.1,8.75,2.1,1.5,0,3.04-.21,4.61-.64,1.56-.43,3.05-1.01,4.45-1.74,1.4-.73,2.59-1.59,3.57-2.56l-3.17-4.45c-1.59,1.38-3.06,2.34-4.42,2.87s-2.84.79-4.42.79c-2.24,0-4.21-.45-5.92-1.34-1.71-.89-3.03-2.17-3.97-3.81-.71-1.24-1.14-2.66-1.32-4.24h24.5l.06-2.68c.04-2.24-.3-4.3-1-6.19-.71-1.89-1.73-3.53-3.05-4.91ZM82.2,287.44c1.5-.83,3.35-1.25,5.55-1.25,1.38,0,2.66.31,3.84.92,1.18.61,2.15,1.44,2.93,2.5.77,1.06,1.22,2.26,1.34,3.6v.43h-17.9c.19-.92.45-1.78.82-2.53.77-1.61,1.91-2.83,3.42-3.66Z" />
                        <path className="cls-3" d="M134.97,282.59c-2.24-1.42-4.8-2.14-7.69-2.14-1.3,0-2.58.21-3.84.64-1.26.43-2.43,1-3.51,1.71-1.08.71-1.96,1.5-2.65,2.38-.15.19-.24.38-.37.57v-17.74h-6.28v44.96h6.28v-4.08c.74.88,1.64,1.68,2.71,2.4,1.12.75,2.36,1.35,3.72,1.8,1.36.45,2.74.67,4.12.67,2.8,0,5.33-.72,7.57-2.17,2.24-1.44,3.99-3.43,5.28-5.95,1.28-2.52,1.92-5.39,1.92-8.6s-.65-6.07-1.95-8.57c-1.3-2.5-3.07-4.46-5.31-5.89ZM134.9,302.69c-.85,1.65-2.01,2.95-3.48,3.9-1.46.96-3.13,1.43-5,1.43s-3.6-.48-5.06-1.43c-1.46-.95-2.62-2.26-3.48-3.9-.85-1.65-1.28-3.53-1.28-5.64s.43-3.94,1.28-5.58c.85-1.65,2.02-2.94,3.48-3.87,1.46-.93,3.15-1.4,5.06-1.4s3.6.47,5.06,1.4c1.46.94,2.61,2.23,3.44,3.87.83,1.65,1.25,3.51,1.25,5.58s-.43,4-1.28,5.64Z" />
                        <path className="cls-3" d="M194.47,272.19c-1.89-1.16-4-1.74-6.31-1.74h-17.38v42.7h6.59v-16.35h10.8c2.32,0,4.42-.6,6.31-1.8,1.89-1.2,3.41-2.8,4.55-4.79,1.14-1.99,1.71-4.21,1.71-6.65s-.57-4.66-1.71-6.65c-1.14-1.99-2.65-3.57-4.55-4.73ZM193.19,287.02c-.55,1.04-1.27,1.87-2.17,2.5-.89.63-1.89.95-2.99.95h-10.67v-13.66h10.67c1.1,0,2.1.31,2.99.92.9.61,1.62,1.42,2.17,2.44.55,1.02.82,2.16.82,3.42s-.27,2.41-.82,3.45Z" />
                        <path className="cls-3" d="M225.49,280.46c-1.5,0-2.96.37-4.36,1.1-1.4.73-2.64,1.73-3.72,2.99-.72.84-1.24,1.76-1.68,2.72v-6.14h-6.34v32.03h6.34v-17.69c0-1.18.22-2.27.67-3.26.45-1,1.05-1.87,1.8-2.62s1.63-1.34,2.62-1.77c.99-.43,2.04-.64,3.14-.64.57,0,1.15.07,1.74.21.59.14,1.13.31,1.62.52l1.65-6.83c-.37-.16-.87-.3-1.49-.43-.63-.12-1.29-.18-1.98-.18Z" />
                        <path className="cls-3" d="M256.87,282.62c-2.46-1.44-5.24-2.17-8.33-2.17s-5.93.72-8.39,2.17c-2.46,1.44-4.4,3.42-5.83,5.92-1.42,2.5-2.13,5.36-2.13,8.57s.71,6.07,2.13,8.57c1.42,2.5,3.36,4.47,5.83,5.92,2.46,1.44,5.26,2.17,8.39,2.17s5.87-.72,8.33-2.17c2.46-1.44,4.4-3.42,5.82-5.92,1.42-2.5,2.13-5.36,2.13-8.57s-.71-6.07-2.13-8.57c-1.42-2.5-3.36-4.47-5.82-5.92ZM257.21,302.69c-.85,1.65-2.03,2.95-3.54,3.9-1.5.96-3.21,1.43-5.12,1.43s-3.63-.48-5.15-1.43c-1.53-.95-2.71-2.26-3.57-3.9-.85-1.65-1.26-3.51-1.22-5.58-.04-2.07.37-3.94,1.22-5.58.85-1.65,2.04-2.95,3.57-3.9,1.53-.95,3.24-1.43,5.15-1.43s3.62.47,5.12,1.4c1.5.94,2.69,2.23,3.54,3.87.85,1.65,1.26,3.53,1.22,5.64.04,2.07-.37,3.93-1.22,5.58Z" />
                        <path className="cls-3" d="M296.92,285.13c-.55-.64-1.18-1.26-1.95-1.84-1.18-.87-2.51-1.57-4-2.07-1.48-.51-3.02-.76-4.61-.76-2.89,0-5.47.72-7.75,2.17-2.28,1.44-4.08,3.42-5.4,5.92-1.32,2.5-1.98,5.36-1.98,8.57s.67,6.07,2.01,8.57c1.34,2.5,3.16,4.47,5.46,5.92,2.3,1.44,4.91,2.17,7.84,2.17,1.46,0,2.9-.24,4.3-.73s2.64-1.14,3.72-1.95c.96-.72,1.72-1.52,2.35-2.35v4.43h6.28v-45.14h-6.28v17.12ZM295.91,302.88c-.83,1.69-1.98,3.02-3.45,4-1.46.98-3.15,1.46-5.06,1.46s-3.6-.49-5.06-1.46c-1.47-.98-2.62-2.31-3.45-4-.83-1.69-1.25-3.61-1.25-5.76s.42-4.08,1.25-5.77c.83-1.69,1.98-3.02,3.45-4,1.46-.98,3.15-1.46,5.06-1.46s3.6.49,5.06,1.46c1.46.98,2.61,2.31,3.45,4,.83,1.69,1.25,3.61,1.25,5.77s-.42,4.08-1.25,5.76Z" />
                        <path className="cls-3" d="M336.2,300.41c0,1.14-.2,2.2-.61,3.17-.41.98-.97,1.81-1.68,2.5-.71.69-1.55,1.23-2.53,1.62-.98.39-2.05.58-3.23.58-1.59,0-2.94-.37-4.06-1.1-1.12-.73-1.97-1.78-2.56-3.14-.59-1.36-.88-2.98-.88-4.85v-18.06h-6.28v19.76c0,2.64.46,4.92,1.37,6.83.91,1.91,2.21,3.4,3.9,4.45,1.69,1.06,3.67,1.59,5.95,1.59,1.83,0,3.54-.36,5.13-1.07,1.59-.71,2.96-1.68,4.12-2.9.53-.56.98-1.16,1.37-1.79v5.14h6.28v-32.03h-6.28v19.28Z" />
                        <path className="cls-3" d="M361.79,287.57c1.52-.96,3.26-1.43,5.21-1.43,1.06,0,2.15.22,3.29.67,1.14.45,2.22,1.06,3.23,1.83,1.02.77,1.85,1.63,2.5,2.56l3.48-4.27c-1.22-1.99-3-3.57-5.34-4.73-2.34-1.16-4.93-1.74-7.78-1.74s-5.62.73-7.96,2.2-4.19,3.46-5.55,5.98c-1.36,2.52-2.04,5.35-2.04,8.48s.68,5.96,2.04,8.48c1.36,2.52,3.21,4.51,5.55,5.98,2.34,1.46,4.99,2.2,7.96,2.2,2.6,0,5.11-.59,7.53-1.77,2.42-1.18,4.28-2.68,5.58-4.51l-3.48-4.27c-.85,1.06-1.77,1.95-2.75,2.68-.98.73-1.98,1.28-3.02,1.65-1.04.37-2.1.55-3.2.55-1.87,0-3.58-.49-5.12-1.46-1.55-.98-2.79-2.29-3.72-3.93-.94-1.65-1.4-3.51-1.4-5.58s.45-3.94,1.34-5.61c.9-1.67,2.11-2.98,3.63-3.93Z" />
                        <polygon className="cls-3" points="397.2 272.96 390.92 272.96 390.92 281.13 384.27 281.13 384.27 287.23 390.92 287.23 390.92 313.15 397.2 313.15 397.2 287.23 404.64 287.23 404.64 281.13 397.2 281.13 397.2 272.96" />
                        <path className="cls-3" d="M415.99,266.12c-1.3,0-2.33.37-3.08,1.1-.75.73-1.13,1.69-1.13,2.87,0,1.26.37,2.24,1.1,2.93.73.69,1.77,1.04,3.11,1.04s2.33-.37,3.08-1.1c.75-.73,1.13-1.69,1.13-2.87,0-1.26-.37-2.24-1.1-2.93s-1.77-1.04-3.11-1.04Z" />
                        <rect className="cls-3" x="412.94" y="281.13" width="6.28" height="32.03" />
                        <path className="cls-3" d="M453.11,282.62c-2.46-1.44-5.24-2.17-8.33-2.17s-5.93.72-8.39,2.17c-2.46,1.44-4.4,3.42-5.83,5.92-1.42,2.5-2.13,5.36-2.13,8.57s.71,6.07,2.13,8.57c1.42,2.5,3.36,4.47,5.83,5.92,2.46,1.44,5.26,2.17,8.39,2.17s5.87-.72,8.33-2.17c2.46-1.44,4.4-3.42,5.82-5.92,1.42-2.5,2.13-5.36,2.13-8.57s-.71-6.07-2.13-8.57c-1.42-2.5-3.36-4.47-5.82-5.92ZM453.44,302.69c-.85,1.65-2.03,2.95-3.54,3.9-1.5.96-3.21,1.43-5.12,1.43s-3.63-.48-5.15-1.43c-1.53-.95-2.71-2.26-3.57-3.9-.85-1.65-1.26-3.51-1.22-5.58-.04-2.07.37-3.94,1.22-5.58.85-1.65,2.04-2.95,3.57-3.9,1.53-.95,3.24-1.43,5.15-1.43s3.62.47,5.12,1.4c1.5.94,2.69,2.23,3.54,3.87.85,1.65,1.26,3.53,1.22,5.64.04,2.07-.37,3.93-1.22,5.58Z" />
                        <path className="cls-3" d="M495.96,286.25c-.81-1.95-2.03-3.41-3.66-4.36-1.63-.95-3.66-1.43-6.1-1.43-1.71,0-3.38.38-5,1.13-1.63.75-3.03,1.73-4.21,2.93-.51.52-.91,1.07-1.28,1.63v-5.02h-6.28v32.03h6.28v-19.4c0-1.06.21-2.04.64-2.96.43-.91,1.02-1.72,1.77-2.41.75-.69,1.64-1.23,2.65-1.62,1.02-.39,2.14-.58,3.36-.58,1.5-.08,2.76.15,3.78.7,1.02.55,1.77,1.42,2.26,2.62.49,1.2.73,2.71.73,4.54v19.09h6.28v-19.52c0-2.97-.41-5.43-1.22-7.38Z" />
                    </g>
                </g>
            </g>
        </svg>

        {/* Animated orbit (exactly as provided in original code) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-75 pointer-events-none">
            <svg width="195" height="195" viewBox="0 0 651 651" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M106.366 336C112.119 275.288 139.549 216.427 188.095 172.028C278.605 89.2495 412.651 84.0546 508.5 152.797" stroke="#52b8f4" strokeWidth="3.82348" strokeLinecap="round" strokeDasharray="534.6488037109375" strokeDashoffset="534.6488037109375" opacity="0.9">
                    <animate attributeName="stroke-dashoffset" from="534.6488037109375" to="0" dur="3s" calcMode="linear" begin="0s" fill="freeze" />
                </path>
                <path d="M524.501 165.27C532.78 172.272 540.707 179.882 548.219 188.096C643.228 291.978 636.034 453.21 532.152 548.219C442.973 629.78 311.53 636.023 216.001 570.436" stroke="#52b8f4" strokeWidth="3.82348" strokeLinecap="round" strokeDasharray="775.411865234375" strokeDashoffset="775.411865234375" opacity="0.9">
                    <animate attributeName="stroke-dashoffset" from="775.411865234375" to="0" dur="3s" calcMode="linear" begin="0s" fill="freeze" />
                </path>
                <path d="M205 562.44C193.34 553.478 182.297 543.38 172.028 532.151C127.131 483.061 105.057 421.164 105.224 359.5" stroke="#52b8f4" strokeWidth="3.82348" strokeLinecap="round" strokeDasharray="234.3143310546875" strokeDashoffset="234.3143310546875" opacity="0.9">
                    <animate attributeName="stroke-dashoffset" from="234.3143310546875" to="0" dur="3s" calcMode="linear" begin="0s" fill="freeze" />
                </path>
                <circle cx="0" cy="0" r="11.4705" fill="#52b8f4" stroke="#52b8f4" strokeWidth="3.82348">
                    <animateMotion dur="3s" repeatCount="1" calcMode="linear" fill="freeze" path="M106.366 336C112.119 275.288 139.549 216.427 188.095 172.028C278.605 89.2495 412.651 84.0546 508.5 152.797" begin="0s" keyPoints="0;1" keyTimes="0;1" />
                </circle>
                <circle cx="0" cy="0" r="8.28422" fill="#52b8f4" stroke="#52b8f4" strokeWidth="3.82348">
                    <animateMotion dur="3s" repeatCount="1" calcMode="linear" fill="freeze" path="M524.501 165.27C532.78 172.272 540.707 179.882 548.219 188.096C643.228 291.978 636.034 453.21 532.152 548.219C442.973 629.78 311.53 636.023 216.001 570.436" begin="0s" keyPoints="0;1" keyTimes="0;1" />
                </circle>
                <circle cx="0" cy="0" r="14.6567" fill="#52b8f4" stroke="#52b8f4" strokeWidth="3.82348">
                    <animateMotion dur="3s" repeatCount="1" calcMode="linear" fill="freeze" path="M205 562.44C193.34 553.478 182.297 543.38 172.028 532.151C127.131 483.061 105.057 421.164 105.224 359.5" begin="0s" keyPoints="0;1" keyTimes="0;1" />
                </circle>
            </svg>
        </div>
    </div>
);

// EMBEDDED FLAG SVGS
const IndiaFlagSVG = () => (
    <svg width="24" height="16" viewBox="0 0 900 600" className="w-6 h-4 object-cover shadow-sm">
        <rect width="900" height="200" fill="#f93" />
        <rect width="900" height="200" y="200" fill="#fff" />
        <rect width="900" height="200" y="400" fill="#128807" />
        <g transform="translate(450,300)">
            <circle r="45" fill="none" stroke="#000080" strokeWidth="2" />
            {[...Array(24)].map((_, i) => (
                <line key={i} x1="0" y1="0" x2="0" y2="-45" stroke="#000080" strokeWidth="1" transform={`rotate(${i * 15})`} />
            ))}
        </g>
    </svg>
);

const USAFlagSVG = () => (
    <svg width="24" height="16" viewBox="0 0 741 390" className="w-6 h-4 object-cover shadow-sm">
        <rect width="741" height="390" fill="#b22234" />
        {[...Array(7)].map((_, i) => (
            <rect key={i} width="741" height="30" y={i * 60 + 30} fill="#fff" />
        ))}
        <rect width="296.4" height="210" fill="#3c3b6e" />
        {[...Array(9)].map((_, row) => (
            [...Array(6)].map((_, col) => {
                const x = col * 48 + (row % 2 === 0 ? 24 : 48);
                const y = row * 21 + 18;
                if (row % 2 !== 0 && col === 5) return null;
                return <circle key={`${row}-${col}`} cx={x} cy={y} r="3" fill="#fff" />;
            })
        ))}
    </svg>
);

const Footer = () => {
    return (
        <footer className="relative bg-[#061e4f] border-t border-white/5 text-white w-full z-[60] font-poppins px-4 py-12 md:px-32 md:py-16 mx-auto overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#04153b] to-[#010a20] opacity-50" />
            <div className="container mx-auto relative z-10">
                <div className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-between w-full">
                    {/* Logo Section */}
                    <div className="w-full lg:w-auto flex justify-center lg:justify-start pr-10 mb-10 lg:mb-0">
                        <LogoSVG />
                    </div>
                    
                    {/* PC Navigation Links Grid */}
                    <div className="hidden lg:flex gap-16">
                        <div className="flex flex-col space-y-1 text-[#57C2FF]">
                            <h1 className="text-white text-lg font-semibold">Company</h1>
                            <Link className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-[#57C2FF]" to="/">Home</Link>
                            <Link className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white" to="/about">About</Link>
                            <Link className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white" to="/contact">Contact us</Link>
                            <Link className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white" to="/careers">Careers</Link>
                            <Link className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white" to="/products">Products</Link>
                            <Link className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white" to="/Solutions">Solutions</Link>
                        </div>
                        
                        <div className="flex flex-col space-y-1 text-[#57C2FF]">
                            <h1 className="text-white text-lg font-semibold">Services</h1>
                            <Link className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white" to="/services/applicationServices">Application Support Services</Link>
                            <Link className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white" to="/services/enterpriseplatformServices">Enterprise Platform Services</Link>
                            <Link className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white" to="/services/CRMImplementation">CRM Implementation</Link>
                            <Link className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white" to="/services/softwareproductdevelopment">Software Product Development</Link>
                            <Link className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white" to="/services/qualityengineeringassurance">Quality Engineering & Assurance</Link>
                            <Link className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white" to="/services/engineeringresearchdevelopment">Engineering Research & Development</Link>
                            <Link className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white" to="/services/technology">Technology Consulting</Link>
                        </div>
                        
                        <div className="flex flex-col space-y-1 text-[#57C2FF]">
                            <div className="h-6"></div>
                            <Link className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white" to="/services/businessprocessservices">Business Process Services</Link>
                            <Link className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white" to="/services/dataandai">Data & AI</Link>
                            <Link className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white" to="/services/agenticaisolutions">Agentic AI Solutions</Link>
                            <Link className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white" to="/services/intelligentbusinessautomations">Intelligent Business Automations</Link>
                            <Link className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white" to="/services/gwpinsights">GWP Insights</Link>
                            <Link className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white" to="/services/experimentationoptimization">Experimentation & Optimization</Link>
                        </div>
                        
                        <div className="flex flex-col space-y-1 text-[#57C2FF]">
                            <div className="h-6"></div>
                            <Link className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white" to="/services/digital">Digital Strategy</Link>
                            <Link className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white" to="/services/sustainability">Sustainability & Resilience</Link>
                            <Link className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white" to="/services/experiencestudio">Experience Studio</Link>
                            <Link className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white" to="/services/contentservices">Content Services</Link>
                            <Link className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white" to="/services/branding">Branding</Link>
                            <Link className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white" to="/services/gamesproductiondevelopment">Games Production & Development</Link>
                            <Link className="text-sm hover:text-[#57C2FF] transition-colors duration-300 text-white" to="/services/accessibility">Accessibility</Link>
                        </div>
                        
                        <div className="flex flex-col space-y-1 text-[#57C2FF]">
                            <h1 className="text-white text-lg font-semibold">Partners</h1>
                            <a href="https://www.artech.com/" target="_blank" rel="noopener noreferrer" className="text-sm transition-colors duration-300 text-white hover:text-[#57C2FF]">Artech</a>
                            <a href="https://ladder7.in" target="_blank" rel="noopener noreferrer" className="text-sm transition-colors duration-300 text-white hover:text-[#57C2FF]">Ladder7</a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="relative w-full my-10">
                    <div className="h-[1px] w-full bg-[#57C2FF]/30 shadow-[0_0_10px_rgba(87,194,255,0.1)]"></div>
                </div>

                {/* Footer Bottom Credentials and Location section */}
                <div className="flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0">
                    <div className="flex flex-col items-start space-y-4">
                        <div className="flex space-x-4">
                            <a href="https://www.linkedin.com/company/global-web-production/" target="_blank" rel="noopener noreferrer" className="bg-white p-2 rounded shadow-md hover:scale-110 transition-transform">
                                <FaLinkedinIn className="text-[#061539] text-xl" />
                            </a>
                            <a href="mailto:lekshmi@globalwebproduction.com" className="bg-white p-2 rounded shadow-md hover:scale-110 transition-transform">
                                <FaEnvelope className="text-[#061539] text-xl" />
                            </a>
                        </div>
                        <div className="text-white text-xs md:text-sm">
                            © Copyright 2026 | Global Web Production LLC | All Rights Reserved
                        </div>
                    </div>
                    
                    <div className="flex flex-row sm:flex-col md:flex-row gap-10 md:gap-14 text-right items-start md:items-start sm:pl-10 pl-0 w-full md:w-auto justify-between md:justify-end">
                        <div className="flex flex-col items-end space-y-2">
                            <div className="flex items-center space-x-2">
                                <IndiaFlagSVG />
                                <div className="font-semibold">INDIA</div>
                            </div>
                            <p className="text-xs md:text-sm max-w-xs text-right">Trivandrum,<br />kerala,India</p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                            <div className="flex items-center space-x-2">
                                <USAFlagSVG />
                                <div className="font-semibold">USA</div>
                            </div>
                            <p className="text-xs md:text-sm max-w-xs text-right">Hourglass ST,<br />Temecula, CA</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </footer>
    );
};

export default Footer;
