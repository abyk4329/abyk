'use client';

import { useState } from "react";
import { sendWealthEmail } from "@/modules/wealth-code/utils/email";

type SendEmailButtonProps = {
    to: string;
    name?: string;
    code?: string;
    body?: string[];
    shareUrl?: string;
    label?: string;
    onSent?: () => void;
};

type Status = "idle" | "success" | "error";

export function SendEmailButton({
    to,
    name,
    code,
    body,
    shareUrl,
    label = "שלח מייל שוב",
    onSent,
}: SendEmailButtonProps) {
    const [status, setStatus] = useState<Status>("idle");
    const [loading, setLoading] = useState(false);

    const buttonLabel = loading ? "שולח…" : status === "success" ? "נשלח!" : label;

    const handleClick = async () => {
        if (!to || loading) {
            return;
        }

        setLoading(true);
        setStatus("idle");
        try {
            await sendWealthEmail({ to, name, code, body, shareUrl });
            setStatus("success");
            onSent?.();
        } catch (error) {
            console.error("Failed to send wealth email");
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-end gap-2">
            <button
                className="neuro-button rounded-2xl px-5 py-3"
                style={{ color: "#87674F" }}
                disabled={loading || !to}
                onClick={handleClick}
                type="button"
            >
                {buttonLabel}
            </button>
            {status === "error" && (
                <span className="text-sm text-rose-600">שליחה נכשלה, נסי שוב.</span>
            )}
            {status === "success" && (
                <span className="text-sm text-emerald-600">המייל נשלח בהצלחה.</span>
            )}
        </div>
    );
}
