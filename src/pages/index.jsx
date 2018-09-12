import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import ProjectImage from '../components/atoms/ProjectImage'
import FullWidth from '../components/atoms/FullWidth'
import styles from './index.module.scss'

const Home = ({ data, location }) => {
  const projects = data.allProjectsYaml.edges

  return (
    <Layout location={location}>
      <FullWidth>
        <div className={styles.projects}>
          {projects.map(({ node }) => {
            const { slug, title, img } = node

            return (
              <article className={styles.project} key={slug}>
                <Link to={slug}>
                  <h1 className={styles.title}>{title}</h1>
                  <ProjectImage fluid={img.childImageSharp.fluid} alt={title} />
                </Link>
              </article>
            )
          })}
        </div>
      </FullWidth>
    </Layout>
  )
}

Home.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object
}

export default Home

export const IndexQuery = graphql`
  query {
    allProjectsYaml {
      edges {
        node {
          title
          slug
          img {
            childImageSharp {
              fluid(maxWidth: 980, quality: 85) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`
