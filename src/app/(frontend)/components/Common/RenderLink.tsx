import React from 'react';
import Link from 'next/link';

// A generic link type that can be used with Payload or other CMS
export interface CustomLink {
  label?: string | undefined;
  url?: string | undefined;
  external?: boolean | null;
  icon?: string | null;
}

// Extend standard anchor attributes to allow passing onClick, aria-label, etc.
interface RenderLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  link?: CustomLink | null;
}

export const RenderLink: React.FC<RenderLinkProps> = ({ link, className, children, ...rest }) => {
  const { url, external, label } = link || {};
  
  // Display children if provided, otherwise fallback to the default label
  const content = children || label;

  if (!url && !content) {
    return null;
  }

  // If there is no URL, return a simple div
  if (!url) {
    return <div className={className} {...(rest as React.HTMLAttributes<HTMLDivElement>)}>{content}</div>;
  }

  // Determine if the link is external either explicitly or auto-detected
  const isExternal = external || /^(https?:|mailto:|tel:)/i.test(url);

  // If the link is external, use an <a> tag with security best practices
  if (isExternal) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
        {content}
      </a>
    );
  }

  // Otherwise, it's an internal link, use Next.js router
  return (
    <Link href={url} className={className} {...rest}>
      {content}
    </Link>
  );
};