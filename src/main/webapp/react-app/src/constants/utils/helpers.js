export function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export const capitalizeFirsLetter = (label) =>
    label.charAt(0).toUpperCase() + label.slice(1);