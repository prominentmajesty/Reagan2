import React from 'react';
import styles from './Result.module.css';

const Result = ({result}) => {
  console.log(result);
  return (
    <div className={styles.right_color}>
      <span>
        <div className={styles.caption_div}>
          <h4 className={styles.caption}>Year one First Semester Result..</h4>
        </div>
      </span>
    </div>
  )
}

export default Result;