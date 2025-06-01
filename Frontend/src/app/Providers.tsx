import { HeroUIProvider } from "@heroui/react";

type Props = {
    children: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
    return <HeroUIProvider>{children}</HeroUIProvider>;
};
