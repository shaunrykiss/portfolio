import React, { useState, useEffect, useLayoutEffect } from "react";
import { StaticQuery, graphql } from "gatsby";

import { parallaxStyle, parallaxStyleResume } from '../../utilities/helper-functions';
import { Parallax } from "react-scroll-parallax";

import { Controller, Scene } from "react-scrollmagic";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";

import ResumeItem from '../elements/resumeItem';

const Resume = props => {  
  const [resumeProps, setResumeProps] = useState({
    resumeSorted: {},
    resumeCategories: [],
    resumeHasMultipleCategories: false,
  })

  const [currentCategory, setCurrentCategory] = useState("")

  const [containerHeight, setContainerHeight] = useState(0)

  const [categoriesAreScrolling, setCategoriesAreScrolling] = useState(false);

  useEffect(() => {
    sortResumeItems();

    window.addEventListener("resize", () => {
      getContainerHeight();

      if (window.innerWidth < 993) {
        setCategoriesAreScrolling(true);
      }
    });
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useLayoutEffect(() => {
    getContainerHeight();
  }, [resumeProps, currentCategory]) // eslint-disable-line react-hooks/exhaustive-deps

  const getContainerHeight = () => {    
    if (currentCategory) {
      const currentSlide = document.querySelector(`.resume__slide[data-category='${currentCategory}']`);
      
      setContainerHeight(currentSlide.clientHeight);
    }
  }

  const sortResumeItems = () => {
    const resumeItems = props.data.allContentfulResumeItem.edges.map(
      item => item.node
    )

    const resumeCategories = new Set()
    resumeItems.map(item => resumeCategories.add(item.category))

    const categoryMap = {}
    resumeCategories.forEach(category => {
      const categorySlug = category.toLowerCase().split(" ").join("_")
      categoryMap[categorySlug] = {
        title: category,
        slug: categorySlug,
        items: [],
      }
    })

    const categorySlugs = Array.from(resumeCategories).map(category =>
      category.toLowerCase().split(" ").join("_")
    )

    resumeItems.forEach(item => {
      categoryMap[item.category.toLowerCase().split(" ").join("_")].items.push(
        item
      )
    })

    setResumeProps({
      resumeSorted: categoryMap,
      resumeHasMultipleCategories: resumeCategories.size > 1,
      resumeCategories: categorySlugs,
    })

    setCurrentCategory(categorySlugs[0])
  }

  const handleTabClick = e => {
    const category = e.target.dataset.category

    setCurrentCategory(category)
  }

  const resumeFile =
    props.data.allContentfulResumeFile.edges[0].node.resumeFile.file.url

  return (
    <Controller>
      <Scene
        offset="-250"
        triggerHook="onCenter"
        classToggle="section--fade-in"
        triggerElement=".resume"
        reverse="true"
      >
        <section className="resume" id="resume">
          <div className="wrapper">
            <Parallax
              className="parallax"
              x={[70, -20]}
              styleOuter={categoriesAreScrolling ? parallaxStyleResume : parallaxStyle}
            >
              <div className="parallax-heading"></div>
            </Parallax>

            <div className="section-content">
              <div className="resume__header">
                <h2 className="section-heading">Resume / CV</h2>
                <a
                  className="section-subheading resume__download-link"
                  target="_blank"
                  rel="noreferrer"
                  href={resumeFile}
                  download
                >
                  <span>download</span>
                  <FontAwesomeIcon icon={faFilePdf}></FontAwesomeIcon>
                </a>
              </div>

              <div className="resume__categories-container">
                <ul className="resume__categories">
                  {resumeProps.resumeCategories.map((category, i) => (
                    <li key={i}>
                      <button
                        data-category={resumeProps.resumeSorted[category].slug}
                        onClick={handleTabClick}
                        className={`resume__category-tab${
                          resumeProps.resumeSorted[category].slug ===
                          currentCategory
                            ? " active-tab"
                            : ""
                        }`}
                      >
                        {resumeProps.resumeSorted[category].title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="resume__container"
                style={{ minHeight: `${containerHeight}px` }}
              >
                {resumeProps.resumeCategories.map((cat, index) => {
                  const category = resumeProps.resumeSorted[cat]

                  return (
                    <div
                      className={`resume__slide${
                        currentCategory === category.slug ? " active" : ""
                      }`}
                      key={index}
                      data-category={category.slug}
                    >
                      <div className="resume__slide-wrapper">
                        <h3>{category.title}</h3>

                        <div className="resume__slide-container">
                          {category.items.map((item, ind) => {
                            return (
                              <ResumeItem item={item} key={ind}></ResumeItem>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      </Scene>
    </Controller>
  )
}

export default () => (
  <StaticQuery
    query={graphql`
      query ResumeItemsQuery {
        allContentfulResumeItem(
          sort: {
            fields: [startDate, order, title]
            order: [DESC, DESC, ASC]
          }
        ) {
          edges {
            node {
              title
              startDate
              endDate
              companies
              description {
                description
              }
              directors
              producers
              writers
              executiveProducers
              category
              order
            }
          }
        }
        allContentfulResumeFile {
          edges {
            node {
              resumeFile {
                file {
                  url
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Resume data={data} />}
  />
)

