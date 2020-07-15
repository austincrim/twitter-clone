export default function Button({ style, children, onClick}) {
    let classList = 'px-4 py-2 rounded transition-all duration-75 ease-in ';

    switch(style) {
        case 'blue':
            classList += 'text-gray-100 bg-blue-400 hover:bg-blue-500';
            break;
        case 'red':
            classList += 'text-red-700 bg-red-200 hover:bg-red-300';
            break;
    }

    return (
        <button className={classList} onClick={onClick}>
            {children}
        </button>
    )
}
