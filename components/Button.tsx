export default function Button(props) {
    const { buttonStyle } = props;
    let classList = 'rounded transition-all duration-75 ease-in ';

    switch (buttonStyle) {
        case 'blue':
            classList += 'px-4 py-2 text-gray-100 bg-blue-400 hover:bg-blue-500';
            break;
        case 'red':
            classList += 'px-4 py-2 text-red-700 bg-red-200 hover:bg-red-300';
            break;
        case 'link':
            classList += 'text-blue-400 hover:text-blue-600';
            break;
    }

    return <button className={classList} {...props}></button>;
}
