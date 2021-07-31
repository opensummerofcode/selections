import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { Badge, Pane, Pill, ChevronDownIcon } from 'evergreen-ui';
import { DragSource } from 'react-dnd';
import { useSuggestions } from '@/hooks';

import styles from '../assets/styles/student-card.module.scss';
import StudentCardCollapsable from './StudentCardCollapsable';

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

const beginDrag = (props) => ({ ...props });

const endDrag = (props, monitor) => {
  if (!monitor.didDrop()) return;

  const { student } = monitor.getItem();
  const { project } = monitor.getDropResult();
  project.startAssigning(student);
};

const StudentCard = ({ student, connectDragSource }) => {
  const router = useRouter();

  const { firstName, lastName } = student;
  const { suggestions } = useSuggestions();

  const [isOpen, setIsOpen] = useState(false);

  const selectedStudentId = router.query.id;
  const isActive = selectedStudentId && selectedStudentId === student.id;

  const suggestionList = suggestions[student.id];
  const countSuggestionsOfType = (type) => {
    if (!suggestionList) return 0;
    return Object.keys(suggestionList).filter((person) => suggestionList[person].status === type)
      .length;
  };

  const suggestionAmounts = ['yes', 'maybe', 'no'].reduce(
    (all, status) => {
      const amount = countSuggestionsOfType(status);
      all[status] = amount;
      all.total += amount;
      return all;
    },
    { total: 0 }
  );

  return connectDragSource(
    <li className={styles.card}>
      <button type="button" className={`button--seamless ${styles['button--flex']}`}>
        <Pane
          className={`${styles.wrapper} ${isActive ? styles.active : ''} ${
            styles[`status-${student.statusType}`]
          }`}
          elevation={isActive ? 2 : 1}
        >
          <Link href={`/student/${student.id}/${student.firstName}-${student.lastName}`}>
            <div className={styles.preview}>
                <div className={styles.name}>
                {firstName}&nbsp;<strong>{lastName}</strong>
                {student.isAlum && (
                      <Badge color="green" marginLeft={8}>
                    alum
                  </Badge>
                )}
                {suggestionAmounts.total > 0 && (
                      <div className={styles['suggestion-amount']}>
                    <Pill>{suggestionAmounts.total}</Pill>
                  </div>
                )}
              </div>

                <div className={styles.projectDetails}>
                <span className={styles.role}>
                  {/* ROLE PLACEHOLDER */}
                  Front-end developer
                            </span>
                <span className={styles.assignedProject}>
                  {/* OPTIONAL project name PLACEHOLDER */}
                  Deloitte
                            </span>
              </div>
              </div>
          </Link>

          <div
            className={`${styles.dropDownToggle} ${isOpen ? styles.open : ''} `}
            onClick={() => setIsOpen(!isOpen)}
            <ChevronDownIcon size={22} />
          </div>

          <div className={styles.suggestions}>
            {/* TODO: This could be a lot more dynamic */}
            {suggestionAmounts.total > 0 ? (
                <>
                {suggestionAmounts.yes > 0 && (
                <span
                      style={{ flex: suggestionAmounts.yes / suggestionAmounts.total }}
                      className={styles['suggestions-yes']}
                    />
                )}
                <span
                  style={{ flex: suggestionAmounts.maybe / suggestionAmounts.total }}
                  className={styles['suggestions-maybe']}
                />
                {suggestionAmounts.no > 0 && (
                  <span
                    style={{ flex: suggestionAmounts.no / suggestionAmounts.total }}
                    className={styles['suggestions-no']}
                  />
                )}
              </>
            ) : (
              <span className={styles['suggestions-empty']} />
            )}
          </div>
        </Pane>
      </button>

      {isOpen && <StudentCardCollapsable student={student} isOpen={isOpen} />}
    </li>
  );
};

export default DragSource('student', { beginDrag, endDrag }, collect)(StudentCard);
