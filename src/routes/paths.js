// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_ADMIN = '/admin';


// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
};


export const PATH_PAGE = {
  page404: '/404',
  page500: '/500',
};



export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
