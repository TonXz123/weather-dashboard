import React from "react";

interface Props {
    message: string;
    onRetry: () => void;
}

const ErrorState = React.memo(({ message, onRetry }: Props) => {
    return (
        <div className="text-center text-white py-10">
            <p className="mb-4">{message}</p>
            <button
                onClick={onRetry}
                className="px-4 py-2 bg-white/20 rounded-full hover:bg-white/30"
            >
                ลองใหม่
            </button>
        </div>
    );
});

ErrorState.displayName = "ErrorState";

export default ErrorState;
