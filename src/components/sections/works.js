import React, { useState, useEffect } from "react";

import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import { Controller, Scene } from "react-scrollmagic";
import { Modal } from 'react-responsive-modal';

import "react-responsive-modal/styles.css";
import "../../styles/globals/_modal.css";

import WorkItem from '../elements/workItem';

import { slugify } from '../../utilities/helper-functions';

const Works = props => {
  const [worksCategories, setWorksCategories] = useState([]);
  const [workItems, setWorkItems] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const items = props.data.allContentfulWorkItem.edges.map(item => item.node);
    setWorkItems(items);

    const categories = new Set();
    items.forEach(item =>
      categories.add(item.category)
    );
    setWorksCategories(Array.from(categories));
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleTabClick = e => {
    const current = e.target.dataset.category;
    
    setCurrentCategory(current);

    const items = Array.from(document.querySelectorAll('.works__item'))
    items.forEach(item => {
      item.classList.remove('active');

      if (current === 'all' || current === item.dataset.category) {
        setTimeout(() => {
          item.classList.add('active');
        }, 300);
      }
    });
  }

  const handleItemClick = (e, item) => {
    e.preventDefault();
    setSelectedItem(item);
    setModalIsOpen(true);
    document.getElementById("___gatsby").style.overflow = "hidden"
  }

  const closeModal = () => {
    setModalIsOpen(false);
    document.getElementById("___gatsby").style.overflow = "visible"
  }

  return (
    <Controller>
      <Scene
        offset="-350"
        triggerHook="onCenter"
        classToggle="section--fade-in"
        triggerElement=".works"
        reverse="true"
      >
        <section className="works" id="works">
          <div className="wrapper">
            <div className="section-content">
              <h2 className="section-heading">Works</h2>

              <div className="works__categories-container">
                <ul className="works__categories">
                  <li>
                    <button
                      className={`works__category${
                        currentCategory === "all" ? " active" : ""
                      }`}
                      data-category="all"
                      onClick={handleTabClick}
                    >
                      All
                    </button>
                  </li>

                  {worksCategories.map((category, i) => (
                    <li key={i}>
                      <button
                        className={`works__category${
                          currentCategory === slugify(category) ? " active" : ""
                        }`}
                        data-category={slugify(category)}
                        onClick={handleTabClick}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="works__grid">
                {workItems.map((item, i) => (
                  <a
                    className={`works__item active`}
                    href="/"
                    data-category={slugify(item.category)}
                    key={i}
                    onClick={e => handleItemClick(e, item)}
                  >
                    <Img fluid={item.image.fluid}></Img>
                    <div className="works__item-overlay">
                      <h3>{item.title}</h3>
                      <p>{item.genre}</p>
                      <div aria-hidden="true" className="works__learn-more">
                        <span>+</span>
                      </div>
                      <p className="sr-only">Learn More</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <Modal
            open={modalIsOpen}
            onClose={closeModal}
            center
            aria-labelledby={"slugify(selectedItem.title)"}
            classNames={{
              overlay: "work-item-modal__overlay",
              modal: "work-item-modal",
              closeButton: "work-item-modal__close",
            }}
          >
            <WorkItem item={selectedItem} closeModal={closeModal}></WorkItem>
          </Modal>
        </section>
      </Scene>
    </Controller>
  );
};

export default () => (
  <StaticQuery
    query={graphql`
      query WorkItemsQuery {
        allContentfulWorkItem(
          sort: {
            order: [DESC, ASC]
            fields: [order, title]
          }
        ) {
          edges {
            node {
              title
              order
              startingYear
              endingYear
              runningTime
              link
              image {
                fluid {
                  ...GatsbyContentfulFluid
                }
              }
              genre
              description {
                internal {
                  content
                }
              }
              category
              directors
              producers
              production
              writers
              executiveProducers
              network
              status
            }
          }
        }
      }
    `}
    render={data => <Works data={data} />}
  />
)
