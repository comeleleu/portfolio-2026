type DescriptionProps = {
    text: string | any;
};

const renderText = (child: any, index: number) => {
    if (child.type === "text") {
        let textNode = <span key={index}>{child.text}</span>;
        if (child.format & 1) textNode = <strong key={index}>{textNode}</strong>;
        if (child.format & 2) textNode = <em key={index}>{textNode}</em>;
        if (child.format & 4) textNode = <s key={index}>{textNode}</s>;
        if (child.format & 8) textNode = <u key={index}>{textNode}</u>;
        if (child.format & 16) textNode = <code key={index}>{textNode}</code>;
        if (child.format & 32) textNode = <sub key={index}>{textNode}</sub>;
        if (child.format & 64) textNode = <sup key={index}>{textNode}</sup>;
        return textNode;
    }
    return null;
};

export const Description = ({
    text
}: DescriptionProps) => {
    if (typeof text === "string") {
        return (
            <p className="text-sm text-neutral-400 indent-8">{text}</p>
        );
    }

    const content = text?.root?.children || (Array.isArray(text) ? text : []);

    return (
        <div className="text-sm text-neutral-400">
            {content.map((node: any, index: number) => {
                if (node.type === "paragraph") {
                    return (
                        <p key={index} className="indent-8 mb-2">
                            {node.children?.map((child: any, childIndex: number) => renderText(child, childIndex))}
                        </p>
                    );
                }
                if (node.type === "list") {
                    const Tag = node.listType === "number" ? "ol" : "ul";
                    const listClass = node.listType === "number" ? "list-decimal" : "list-disc";
                    return (
                        <Tag key={index} className={`${listClass} ml-8 mb-2 pl-4`}>
                            {node.children?.map((listItem: any, itemIndex: number) => (
                                <li key={itemIndex}>
                                    {listItem.children?.map((child: any, childIndex: number) => renderText(child, childIndex))}
                                </li>
                            ))}
                        </Tag>
                    );
                }
                return null;
            })}
        </div>
    );
};