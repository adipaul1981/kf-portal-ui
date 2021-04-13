import { BaseSvg } from 'icons';

export default ({ fill = '#fff', size = '18px', width = size, height = size, ...props }) =>
  BaseSvg({
    svg: `<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M29.9153 12.5355L28.4856 11.1058C28.377 11.0004 28.2042 11.0004 28.0956 11.1058C27.8499 11.3415 27.5918 11.564 27.3224 11.7723L24.6521 9.09615C25.004 8.57023 25.2083 7.93532 25.2083 7.25802C25.2083 5.48675 23.8106 4.00533 22.0312 4.00533C21.3353 4.00533 20.6978 4.23193 20.1794 4.61384L18.2372 2.66741C18.4453 2.39787 18.6678 2.13977 18.9038 1.89423C19.0092 1.78562 19.0092 1.61291 18.9038 1.5043L17.4607 0.0812458C17.4104 0.0293191 17.3413 0 17.269 0C17.1968 0 17.1276 0.0293191 17.0774 0.0812458C12.9747 4.35708 13.3513 9.80935 13.7179 15.0783C13.9055 17.0855 13.9544 19.1032 13.8646 21.1171L8.86536 16.1181C10.1972 16.0353 11.5329 16.0353 12.8647 16.1181C12.8447 15.7849 12.8214 15.4517 12.7981 15.1185L12.6914 13.5353C8.19547 13.332 3.71285 13.5919 0.0801022 17.0746C0.0288153 17.1258 0 17.1954 0 17.2679C0 17.3404 0.0288153 17.4099 0.0801022 17.4612L1.50987 18.8909C1.61848 18.9963 1.7912 18.9963 1.89981 18.8909C2.14554 18.6552 2.40364 18.4327 2.67302 18.2244L11.7582 27.3293C11.5501 27.5988 11.3276 27.8569 11.0917 28.1024C10.9867 28.2099 10.9867 28.3816 11.0917 28.489L12.5214 29.9188C12.5717 29.9707 12.6408 30 12.7131 30C12.7853 30 12.8545 29.9707 12.9047 29.9188C17.0074 25.6429 16.6308 20.1907 16.2642 14.9217C16.0803 12.9087 16.0357 10.8854 16.1309 8.8662L21.1301 13.8652C19.7979 13.9426 18.4622 13.937 17.1307 13.8486C17.1507 14.1817 17.174 14.5148 17.1973 14.848C17.2307 15.3745 17.2674 15.9048 17.304 16.4314C21.8033 16.6613 26.2859 16.4081 29.9187 12.9221C29.9712 12.8713 30.0006 12.8011 30 12.7281C29.9994 12.655 29.9688 12.5854 29.9153 12.5355ZM19.0695 6.0808L17.2441 4.25043C16.8896 4.99446 16.6234 5.77741 16.4509 6.5833L23.3864 13.5419C24.1922 13.3689 24.9751 13.1027 25.7194 12.7488L23.2438 10.2664C22.8717 10.4236 22.4627 10.5107 22.0312 10.5107C20.2519 10.5107 18.8542 9.02929 18.8542 7.25802C18.8542 6.84479 18.9302 6.44734 19.0695 6.0808ZM4.27601 17.2479C5.02045 16.8936 5.80328 16.6263 6.60897 16.4514L13.5412 23.4C13.3688 24.206 13.1025 24.9889 12.748 25.7329L4.27601 17.2479ZM20.5208 7.25802C20.5208 6.35695 21.2218 5.672 22.0312 5.672C22.8407 5.672 23.5417 6.35695 23.5417 7.25802C23.5417 8.15909 22.8407 8.84404 22.0312 8.84404C21.2218 8.84404 20.5208 8.15909 20.5208 7.25802Z" fill="#2B388F"/>
</svg>`,
    width,
    height,
    ...props,
  });