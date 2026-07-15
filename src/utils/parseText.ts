/**
 * Extracts the raw text length from a Payload WYSIWYG object.
 */
export const getTextLength = (text: any): number => {
    if (!text) return 0;
    if (typeof text === 'string') return text.length;
    
    let length = 0;
    const content = text?.root?.children || (Array.isArray(text) ? text : []);
    
    const traverse = (nodes: any[]) => {
        nodes.forEach(node => {
            if (node.type === 'text' && node.text) {
                length += node.text.length;
            } else if (node.children) {
                traverse(node.children);
            }
        });
    };
    
    traverse(content);
    
    return length;
};

/**
 * Counts the number of paragraphs in a Payload WYSIWYG object.
 */
export const getParagraphCount = (text: any): number => {
    if (!text) return 0;
    if (typeof text === 'string') return 1;
    
    let count = 0;
    const content = text?.root?.children || (Array.isArray(text) ? text : []);
    
    const traverse = (nodes: any[]) => {
        nodes.forEach(node => {
            if (node.type === 'paragraph') {
                count += 1;
            }
            if (node.children) {
                traverse(node.children);
            }
        });
    };
    
    traverse(content);
    
    return count;
};

export interface WysiwygHeightConfig {
    charactersPerLine?: number;
    lineHeight?: number;
    paragraphMargin?: number;
    marginAtEnd?: boolean;
}

/**
 * Calculates the estimated height of a Payload WYSIWYG text.
 */
export const getTextHeight = (text: any, config?: WysiwygHeightConfig): number => {
    if (!text) return 0;
    
    const charactersPerLine = config?.charactersPerLine ?? 40;
    const lineHeight = config?.lineHeight ?? 20;
    const paragraphMargin = config?.paragraphMargin ?? 8;
    const marginAtEnd = config?.marginAtEnd ?? false;

    if (typeof text === 'string') {
        if (text.length === 0) return 0;
        return Math.ceil(text.length / charactersPerLine) * lineHeight + (marginAtEnd ? paragraphMargin : 0);
    }
    
    let totalHeight = 0;
    const content = text?.root?.children || (Array.isArray(text) ? text : []);
    let paragraphCount = 0;
    
    const traverse = (nodes: any[]) => {
        nodes.forEach(node => {
            if (node.type === 'paragraph') {
                paragraphCount++;
                let paragraphLength = 0;
                
                const getLength = (children: any[]) => {
                    children.forEach(child => {
                        if (child.type === 'text' && child.text) {
                            paragraphLength += child.text.length;
                        } else if (child.children) {
                            getLength(child.children);
                        }
                    });
                };
                
                if (node.children) {
                    getLength(node.children);
                }
                
                totalHeight += Math.ceil(paragraphLength / charactersPerLine) * lineHeight;
                totalHeight += paragraphMargin;
            } else if (node.children) {
                traverse(node.children);
            }
        });
    };
    
    traverse(content);
    
    if (paragraphCount > 0 && !marginAtEnd) {
        totalHeight -= paragraphMargin;
    }
    
    return totalHeight;
};
