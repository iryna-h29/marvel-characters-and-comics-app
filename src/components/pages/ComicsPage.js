import { Helmet } from "react-helmet";

import AppBanner from '../appBanner/AppBanner';
import ComicsList from '../comicsList/ComicsList';

const ComicsPage = () => {

    return (
        <>
            <Helmet>
                    <meta
                        name="description"
                        content="Page with list of all comics"
                        />
                    <title>Comics</title>
            </Helmet>
            <AppBanner/>
            <ComicsList/>
        </>
    )
}

export default ComicsPage;