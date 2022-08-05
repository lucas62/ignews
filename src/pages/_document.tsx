import Document, { Head, Html, Main, NextScript } from "next/document"

/* The MyDocument class is a class that extends the Document class from the next
package. It renders the HTML, Head, and Body tags. The Head tag contains the
link tags for the fonts and favicon. The Body tag contains the Main and
NextScript tags. */
export default class MyDocument extends Document{
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900&display=swap" rel="stylesheet" />

                    <link rel="shortcut icon" href="/favicon.png" type="image/png" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}