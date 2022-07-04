import { Element } from "deno_dom/deno-dom-wasm-noinit.ts";

import { Article, Comment } from "../types.ts";
import { cleanString } from "./util.ts";

const parseComment = (el: Element, index: number): Comment => {
  const comment: Comment = {
    index,
  };

  const dataCommentId = el.getAttribute("data-commentid");
  if (dataCommentId) {
    comment.id = dataCommentId;
  }

  const textElement = el.querySelector(".cmt-content");
  if (textElement) {
    const commentText = cleanString(textElement.textContent).replace(
      /[\t\r\n]/gm,
      " "
    );
    if (commentText === "-weggejorist-") {
      comment.redacted = true;
    } else if (commentText === "-weggejorist en opgerot-") {
      comment.redacted = true;
      comment.userBanned = true;
    }
    comment.text = commentText;
    comment.html = cleanString(textElement.innerHTML);
  }

  const authorElement = el.querySelector("footer .username");
  if (authorElement) {
    comment.author = cleanString(authorElement.textContent);
  }

  const dateTimeElement = el.querySelector("footer .datetime");
  if (dateTimeElement) {
    const arr = dateTimeElement.textContent
      .trim()
      .split(" | ")
      .map((s) => s.replace(/[ |]/gm, ""));
    if (arr.length === 2) {
      comment.date = arr[0];
      comment.time = arr[1];
    }
  }

  return comment;
};

const parseCommentList = (el: Element): Comment[] => {
  const comments: Comment[] = [];
  let comment: Comment;

  [...el.children].forEach((child, index) => {
    if (child.tagName === "ARTICLE" && child.classList.contains("comment")) {
      // parse single
      comment = parseComment(child, index);
      comments.push(comment);
    } else if (
      child.tagName === "DIV" &&
      child.classList.contains("subcomments")
    ) {
      // parse subcomments
      comment.comments = parseCommentList(child);
    }
  });

  return comments;
};

export const parseComments = (el: Element, articleObj: Article): void => {
  articleObj.comments = parseCommentList(el);
};
