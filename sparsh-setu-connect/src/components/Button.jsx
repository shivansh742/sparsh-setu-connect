import React from "react";
import { Link } from "react-router-dom";

const variantClass = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  accent: "btn-accent",
};

export default function Button({ children, to, href, onClick, variant = "primary", type = "button", className = "", ...rest }) {
  const classes = `${variantClass[variant] || variantClass.primary} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {children}
    </button>
  );
}
