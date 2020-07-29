export default function Button({
    buttonStyle,
    onClick = undefined,
    children,
    disabled = false,
}) {
    let classList =
        'rounded transition-all duration-75 ease-in whitespace-no-wrap ';

    switch (buttonStyle) {
        case 'blue':
            classList +=
                'px-4 py-2 text-gray-100 bg-blue-400 hover:bg-blue-500';
            break;
        case 'red':
            classList += 'px-4 py-2 text-red-700 bg-red-200 hover:bg-red-300';
            break;
        case 'link':
            classList += 'text-blue-400 hover:text-blue-600';
            break;
    }

    disabled ? (classList += ' opacity-50 cursor-not-allowed hover:') : null;

    return (
        <button className={classList} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}
