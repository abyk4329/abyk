import { ElementType, ReactNode } from "react";

type MaxWidth = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";

const MAX_WIDTH_CLASS: Record<MaxWidth, string> = {
	sm: "max-w-screen-sm",
	md: "max-w-screen-md",
	lg: "max-w-screen-lg",
	xl: "max-w-screen-xl",
	"2xl": "max-w-screen-2xl",
	"3xl": "max-w-[1536px]",
	full: "max-w-full",
};

export interface PageLayoutProps {
	children: ReactNode;
	as?: ElementType;
	className?: string;
	maxWidth?: MaxWidth;
	padded?: boolean;
}

const baseContainerClasses = "mx-auto flex w-full flex-col";
const basePaddingClasses = "px-5 sm:px-8 lg:px-12";

export function PageLayout({
	children,
	as,
	className,
	maxWidth = "xl",
	padded = true,
}: PageLayoutProps) {
	const Component: ElementType = as ?? "section";
	const maxWidthClass = MAX_WIDTH_CLASS[maxWidth] ?? MAX_WIDTH_CLASS.lg;
	const paddingClass = padded ? basePaddingClasses : "";

	const classes = [baseContainerClasses, maxWidthClass, paddingClass, className]
		.filter(Boolean)
		.join(" ");

	return <Component className={classes}>{children}</Component>;
}

export default PageLayout;
