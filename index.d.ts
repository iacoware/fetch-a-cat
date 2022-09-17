declare module "react-responsive-masonry" {
    import React, { PropsWithChildren } from "react"

    export type MasonryProps = {
        columnsCount: number
    }

    export type FCReturn = ReturnType<React.FC>
    declare function Masonry(props: PropsWithChildren<MasonryProps>): FCReturn

    export default Masonry
}
