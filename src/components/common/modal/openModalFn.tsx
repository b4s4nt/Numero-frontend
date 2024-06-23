import { openModal } from "@mantine/modals";

export function openSimpleModal({ children }: { children: JSX.Element }): void {
    openModal({
        withCloseButton: false,
        closeOnClickOutside: false,
        closeOnEscape: false,
        size: "75%",
        children: children,
    });
}
