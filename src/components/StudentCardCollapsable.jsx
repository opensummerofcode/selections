import Link from 'next/link';
import { useRouter } from 'next/router';

import { 
    Pane,     
    ChevronDownIcon, 
    DoubleChevronRightIcon } from 'evergreen-ui';

import styles from '../assets/styles/student-card-collapsable.module.scss';

const StudentCardCollapsable = ({ student }) => {

    return (
        <div className={`${styles.condensed}`}>
            <span className={styles.role}>
                Primary Role
            </span>
              
            <div>
                <b> Pskill, Sskill,</b> skill1, skill2, skill3, skill4,...
            </div>
          
            <span className={styles.role}>
                Secondary Role
            </span>
              
          <div>
              <b> Pskill, Sskill,</b> skill1, skill2, skill3, skill4,...
          </div>
          
          <div className={styles.recommendations}>
              <span className={styles.recomm}>
                Recommendations
              </span>

              <ul className={styles.recommList}>
                  <li className={`${styles.recommListItem}  ${styles.yes}` }>
                      <span className={styles.recommCoach}>
                        Miet
                      </span>
                      <span>
                        Strong profile
                      </span>
                  </li>
                  <li className={`${styles.recommListItem}  ${styles.maybe}` }>
                      <span className={styles.recommCoach}>
                        Michiel
                      </span>
                      <span>
                        I have some doubts
                      </span>
                  </li>
              </ul>
          </div>

          <div>
            <Link href={`/student/${student.id}/${student.firstName}-${student.lastName}`}>
                <a className={styles.profileLink}>
                    full profile <DoubleChevronRightIcon />
                </a>
            </Link>
          </div>
      </div>
    )
}

export default StudentCardCollapsable
