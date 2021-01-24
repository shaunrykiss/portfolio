import React, { useState, useEffect } from "react";

import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import { Controller, Scene } from "react-scrollmagic";
import { Modal } from 'react-responsive-modal';

import "react-responsive-modal/styles.css";
import "../../styles/globals/_modal.css";

import WorkItem from '../elements/workItem';

import { slugify, listify } from '../../utilities/helper-functions';

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
            aria-labelledby={selectedItem.title}
            classNames={{
              overlay: "work-item-modal__overlay",
              modal: "work-item-modal",
              closeButton: "work-item-modal__close",
            }}
          >
            {/* <WorkItem item={selectedItem} closeModal={closeModal}></WorkItem> */}
            <div className="work-item">
              {/* {itemHasVideo && (
                <div className="work-item__loader-overlay" ref={loader}>
                  <Loader type="TailSpin" color="#1B83EA"></Loader>
                </div>
              )} */}

              {/* {media} */}

              <div className="work-item__content">
                <button className="work-item__close" onClick={closeModal}>
                  {/* <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon> */}
                  close
                </button>

                <h2 id={"slugify(selectedItem.title)"} className="work-item__title">
                  {selectedItem.title}
                  {selectedItem.status && (
                    <span className="work-item__status">
                      ({selectedItem.status})
                    </span>
                  )}
                </h2>

                {selectedItem.genre && (
                  <p className="work-item__genre">{selectedItem.genre}</p>
                )}

                <div className="work-item__time-info">
                  <div className="work-item__year">
                    {/* <FontAwesomeIcon icon={faCalendarAlt}></FontAwesomeIcon> */}
                    <p>{`${selectedItem.startingYear}${
                      selectedItem.endingYear ? ` - ${selectedItem.endingYear}` : ""
                    }`}</p>
                  </div>

                  {selectedItem.runningTime && (
                    <>
                      <div className="work-item__runtime">
                        {/* <FontAwesomeIcon icon={faClock}></FontAwesomeIcon> */}
                        <p>{selectedItem.runningTime}</p>
                      </div>
                    </>
                  )}
                </div>

                {/* {itemHasCredits && ( */}
                  <div className="work-item__credits">
                    <div className="work-item__credits-header">
                      <h3>Credits</h3>

                      {selectedItem.imdbLink && (
                        <a
                          target="_blank"
                          rel="noreferrer"
                          className="work-item__imdb-link"
                          href={selectedItem.imdbLink}
                        >
                          {/* <FontAwesomeIcon icon={faImdb}></FontAwesomeIcon> */}
                          imdb
                        </a>
                      )}
                    </div>

                    {selectedItem.directors && (
                      <div className="work-item__credit-category">
                        <h4>
                          {selectedItem.directors.length > 1
                            ? "Directors"
                            : "Director"}
                        </h4>
                        <p>{listify(selectedItem.directors)}</p>
                      </div>
                    )}

                    {selectedItem.writers && (
                      <div className="work-item__credit-category">
                        <h4>
                          {selectedItem.writers.length > 1 ? "Writers" : "Writer"}
                        </h4>
                        <p>{listify(selectedItem.writers)}</p>
                      </div>
                    )}

                    {selectedItem.executiveProducers && (
                      <div className="work-item__credit-category">
                        <h4>
                          {selectedItem.executiveProducers.length > 1
                            ? "Executive Producers"
                            : "Executive Producer"}
                        </h4>
                        <p>{listify(selectedItem.executiveProducers)}</p>
                      </div>
                    )}

                    {selectedItem.producers && (
                      <div className="work-item__credit-category">
                        <h4>
                          {selectedItem.producers.length > 1
                            ? "Producers"
                            : "Producer"}
                        </h4>
                        <p>{listify(selectedItem.producers)}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* {itemHasProductionInfo && ( */}
                  <div className="work-item__production-info">
                    {selectedItem.production && (
                      <div className="work-item__production-category">
                        <h4>Production</h4>
                        <p>{selectedItem.production}</p>
                      </div>
                    )}

                    {selectedItem.network && (
                      <div className="work-item__production-category">
                        <h4>Network</h4>
                        <p>{selectedItem.network}</p>
                      </div>
                    )}
                  </div>
                {/* )} */}

                {selectedItem.description && (
                  <p className="work-item__description">
                    {selectedItem.description.internal.content}
                  </p>
                )}
              </div>
            </div>
          </Modal>
        </section>
      </Scene>
    </Controller>
  )
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
              imdbLink
            }
          }
        }
      }
    `}
    render={data => <Works data={data} />}
  />
)
