export default function Tweet({ tweet }) {
    const { text, author } = tweet;
    return (
        <div className='flex flex-col justify-center px-6 py-5 bg-gray-100 w-1/2 border-b border-blue-300'>
            <div className='text-lg'>{text}</div>
            <div className='text-sm text-gray-600'>{author}</div>
        </div>
    );
}
