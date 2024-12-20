import logo from "../../assets/incubator_logo.jpg";
export function SiteFooter() {
    let siteConfig = {
        links: {
            website: "https://stage.trustidentity.geant.org/ti-incubator/",
            github: "https://github.com/alexarlord-boop/ti-wizard-gui",
        },
    };
    return (
        <footer className="py-6 md:px-8 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Built by{" "}
                    <a
                        href={siteConfig.links.website}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4"
                    >
                        T&I Incubator Team
                    </a>
                    . The source code is available on{" "}
                    <a
                        href={siteConfig.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4"
                    >
                        GitHub
                    </a>
                    .
                </p>

                <img src={logo} alt="Site Logo" className="h-[60px] w-auto" /> {/* Add this line */}

            </div>

        </footer>
    )
}