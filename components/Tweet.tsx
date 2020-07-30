import { useMutation, queryCache } from "react-query";
import { fetcher } from "../util/fetcher";
import Button from "./Button";
import { useUser } from "../util/hooks";

const deleteTweet = ({ id }) => {
    return fetcher("/api/tweet/delete", { id });
};

export default function Tweet({ tweet }) {
    const { text, author, _id: id } = tweet;
    const { data: user } = useUser();

    const [mutate, { isLoading }] = useMutation(deleteTweet, {
        onSuccess: () => {
            queryCache.invalidateQueries("/api/feed");
        },
    });
    async function handleDelete() {
        await mutate({ id });
    }
    const deleteButton = (
        <Button buttonStyle="red" onClick={handleDelete}>
            {isLoading && "Deleting..."}
            {!isLoading && "Delete"}
        </Button>
    );
    return (
        <div className="flex justify-between px-6 py-5 bg-gray-100 w-full md:1/2 border-b border-blue-300">
            <div className="flex flex-col justify-between">
                <div className="text-lg">{text}</div>
                <div className="text-sm text-gray-600">{author}</div>
            </div>
            {user.username === author && deleteButton}
        </div>
    );
}
