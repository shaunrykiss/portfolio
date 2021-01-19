import React from 'react';

const ResumeItem = props => (
  <div className="resume__item resume-item">
    <div className="resume-item__title-date-description">
      <h4>{props.item.title}</h4>

      <p className="resume-item__description">
        {props.item.description.description}
      </p>

      <p className="resume-item__date">
        {props.item.endDate
          ? `(${props.item.startDate} — ${props.item.endDate})`
          : `(${props.item.startDate})`}
      </p>
    </div>

    <div className="resume-item__companies resume-item__companies--large">
      {props.item.companies &&
        props.item.companies.length &&
        props.item.companies.map((company, i) => <p key={i}>{company}</p>)}
    </div>

    <div className="resume-item__credits">
      {props.item.directors && props.item.directors.length && (
        <div className="resume-item__credit-category">
          <p>{props.item.directors.length > 1 ? "Directors" : "Director"}</p>
          <ul>
            {props.item.directors.map((director, i) => (
              <li key={i}>{director}</li>
            ))}
          </ul>
        </div>
      )}

      {props.item.writers && props.item.writers.length && (
        <div className="resume-item__credit-category">
          <p>{props.item.writers.length > 1 ? "Writers" : "Writer"}</p>
          <ul>
            {props.item.writers.map((writer, i) => (
              <li key={i}>{writer}</li>
            ))}
          </ul>
        </div>
      )}

      {props.item.executiveProducers && props.item.executiveProducers.length && (
        <div className="resume-item__credit-category">
          <p>
            {props.item.executiveProducers.length > 1
              ? "Executive Producers"
              : "Executive Producer"}
          </p>
          <ul>
            {props.item.executiveProducers.map((eProducer, i) => (
              <li key={i}>{eProducer}</li>
            ))}
          </ul>
        </div>
      )}

      {props.item.producers && props.item.producers.length && (
        <div className="resume-item__credit-category">
          <p>{props.item.producers.length > 1 ? "Producers" : "Producer"}</p>
          <ul>
            {props.item.producers.map((producer, i) => (
              <li key={i}>{producer}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  </div>
)

export default ResumeItem;