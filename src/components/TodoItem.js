/* eslint-disable quotes */
/* eslint-disable import/prefer-default-export */
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDone } from "../store";
import * as randomUUID from "../crypto-fall";

import styles from "./index.module.css";

export function TodoItem(props) {
  const { index } = props;

  const dispatch = useDispatch();
  const text = useSelector((state) => state.items[index]);
  const done = useSelector((state) => state.done[index]);

  const onChange = useCallback(() => dispatch(setDone(index, !done)), [index, done, dispatch]);

  return (
    <div data-testid={randomUUID} className={styles.item}>
      <div data-testid="list-item" className={done ? "done" : ""}>
        <input type="checkbox" checked={done} onChange={onChange} />
        {text}
      </div>
    </div>
  );
}
