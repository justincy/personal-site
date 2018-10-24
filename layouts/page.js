import { Component } from "react";
import Head from "next/head";
import PropTypes from "prop-types";
import * as CustomTypes from "@sergiodxa/types";
import { MDXProvider } from "@mdx-js/tag";

import Main from "./main";
import { LinkedHeader } from "../components/header";
import OpenGraph from "../components/open-graph";
import TwitterCard from "../components/twitter-card";

import components from "../components/ui/index";

class PageLayout extends Component {
  static propTypes = {
    meta: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: CustomTypes.stringMax140
    }),
    children: PropTypes.node.isRequired
  };

  render() {
    const { meta, children } = this.props;

    return (
      <Main>
        <Head>
          <title>{meta.title}</title>
          {meta.description && (
            <meta name="description" content={meta.description} />
          )}
        </Head>

        <TwitterCard
          title={meta.title}
          url={this.url}
          description={meta.description}
        />

        <OpenGraph
          title={meta.title}
          description={meta.description}
          url={this.url}
        />

        <LinkedHeader />

        <MDXProvider components={components}>
          <section>{children}</section>
        </MDXProvider>

        <style jsx>{`
          section {
            max-width: 720px;
            margin: 0 1em;
            font-size: 1.25em;
          }
          section :global(li > a) {
            color: black;
            text-decoration: none;
          }
          @media (min-width: 720px) {
            section {
              margin: 0 auto;
            }
          }
        `}</style>
      </Main>
    );
  }
}

export default PageLayout;