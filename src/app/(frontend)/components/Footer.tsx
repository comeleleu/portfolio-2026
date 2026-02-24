export const Footer = () => {
    return (
        <footer className="flex flex-row justify-between text-sm text-neutral-500 border-t border-neutral-800 pt-6 sm:pt-10">
            <p>© {new Date().getFullYear()} - Côme Leleu</p>
            <p>
                Build with <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">Next.js</a>, <a href="https://payloadcms.com/" target="_blank" rel="noopener noreferrer">Payload</a> and <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">Tailwind CSS</a>
            </p>
        </footer>
    );
};