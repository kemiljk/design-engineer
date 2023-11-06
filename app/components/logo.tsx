type Props = {
  className: string;
};

export const Logo = ({ className }: Props) => {
  return (
    <svg
      className={className}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.8391 99.188C13.0465 99.188 9.89867 98.2398 7.39556 96.3435C4.89244 94.3714 3.03407 91.7545 1.82044 88.4929C0.606815 85.2312 0 81.5524 0 77.4564C0 70.2505 1.09985 63.8031 3.29956 58.1142C5.57511 52.4253 9.02637 47.95 13.6533 44.6884C18.3561 41.4268 24.3105 39.796 31.5164 39.796C32.0474 39.796 32.9576 39.8339 34.2471 39.9097C35.5366 39.9097 36.4468 39.9477 36.9778 40.0235C37.357 36.5343 37.6225 33.7657 37.7742 31.7177C38.0018 29.6697 38.1914 28.0389 38.3431 26.8253C38.4948 25.6117 38.6465 24.5877 38.7982 23.7533C37.5846 23.8291 36.1434 23.905 34.4747 23.9808C32.8818 23.9808 31.6681 24.0188 30.8338 24.0946L31.2889 15.4475C34.8539 15.4475 37.8121 15.2579 40.1636 14.8786C42.515 14.4994 44.3733 14.0443 45.7387 13.5133C47.1799 12.9823 48.1659 12.4893 48.6969 12.0342H54.8409C54.1582 18.1023 53.4376 24.1705 52.6791 30.2386C51.9964 36.3068 51.3138 42.3749 50.6311 48.4431C50.1001 53.601 49.5313 58.5693 48.9244 63.348C48.3176 68.1266 47.8246 72.4123 47.4453 76.2049C47.0661 79.9974 46.8764 83.0315 46.8764 85.3071C46.8764 86.6724 47.0661 87.5826 47.4453 88.0377C47.8246 88.417 48.2039 88.6066 48.5831 88.6066C49.4175 88.6066 50.2898 87.9619 51.2 86.6724C52.1102 85.3829 53.0584 83.0315 54.0444 79.6182L60.3022 81.4386C59.9988 83.0315 59.4678 84.852 58.7093 86.9C57.9508 88.948 56.9647 90.9201 55.7511 92.8164C54.5375 94.6369 53.0204 96.1539 51.2 97.3675C49.4554 98.5812 47.3316 99.188 44.8284 99.188C42.4012 99.188 40.2773 98.4674 38.4569 97.0262C36.6364 95.585 35.7262 92.8543 35.7262 88.8342C35.7262 87.3172 35.7641 86.1414 35.84 85.3071C35.9159 84.3969 36.0296 83.297 36.1813 82.0075H36.0676C34.2471 86.4828 32.237 89.972 30.0373 92.4751C27.8376 94.9782 25.6 96.7228 23.3244 97.7089C21.0489 98.6949 18.8871 99.188 16.8391 99.188ZM21.0489 88.8342C22.9452 88.8342 24.6519 87.886 26.1689 85.9897C27.7618 84.0934 29.165 81.4766 30.3787 78.1391C31.6681 74.7257 32.768 70.8194 33.6782 66.42C34.2092 63.6893 34.6643 60.8069 35.0436 57.7729C35.4228 54.6629 35.7641 51.4772 36.0676 48.2155C35.5366 47.988 34.5884 47.7983 33.2231 47.6466C31.8578 47.4191 30.7959 47.3053 30.0373 47.3053C27.4584 47.3053 25.2966 48.0638 23.552 49.5809C21.8074 51.022 20.4041 52.9183 19.3422 55.2697C18.2803 57.6212 17.4459 60.1622 16.8391 62.8929C16.3081 65.6235 15.9289 68.2783 15.7013 70.8573C15.5496 73.3604 15.4738 75.5222 15.4738 77.3426C15.4738 81.2111 15.9668 84.0934 16.9529 85.9897C18.0148 87.886 19.3801 88.8342 21.0489 88.8342Z"
        fill="url(#paint0_linear_73_30)"
      />
      <path
        d="M97.431 116.091L65.2513 83.8541L53.1819 95.8179L43.2353 90.6807C43.2353 90.6807 43.2353 85.9897 46.9964 86.9C47.5767 86.9 56.5342 76.2878 56.5342 76.2878L42.4489 61.1085L50.072 53.5423L65.2513 68.6647L84.8702 48.6522L92.2811 53.5423L72.8176 76.2878L104.997 108.468L97.431 116.091Z"
        fill="url(#paint1_linear_73_30)"
      />
      <path
        d="M103.364 102.165C98.4116 102.165 94.096 101.21 90.4172 99.2997C86.7384 97.3895 83.8732 94.7011 81.8215 91.2346C79.8406 87.6972 78.8502 83.5586 78.8502 78.8186V65.023C78.8502 60.283 79.8406 56.1797 81.8215 52.7131C83.8732 49.1758 86.7384 46.4521 90.4172 44.5419C94.096 42.6318 98.4116 41.6767 103.364 41.6767C108.245 41.6767 112.49 42.6318 116.098 44.5419C119.777 46.4521 122.607 49.1404 124.588 52.607C126.639 56.0028 127.665 60 127.665 64.5985V75.2105H91.5845V79.243C91.5845 83.2048 92.6104 86.2116 94.662 88.2632C96.7137 90.2441 99.6143 91.2346 103.364 91.2346C106.123 91.2346 108.458 90.7747 110.368 89.855C112.349 88.8646 113.516 87.4496 113.87 85.6102H127.029C126.109 90.6332 123.491 94.6658 119.176 97.7079C114.86 100.679 109.59 102.165 103.364 102.165ZM114.931 67.676V64.4924C114.931 60.4599 113.94 57.347 111.96 55.1539C110.049 52.9607 107.184 51.8642 103.364 51.8642C99.5435 51.8642 96.6075 52.9961 94.5559 55.26C92.575 57.4531 91.5845 60.566 91.5845 64.5985V66.6148L115.886 66.5087L114.931 67.676Z"
        fill="url(#paint2_linear_73_30)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_73_30"
          x1="0"
          y1="12.0342"
          x2="127.665"
          y2="116.091"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#3BA7F6" />
          <stop offset="1" stop-color="#1554E0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_73_30"
          x1="0"
          y1="12.0342"
          x2="127.665"
          y2="116.091"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#3BA7F6" />
          <stop offset="1" stop-color="#1554E0" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_73_30"
          x1="0"
          y1="12.0342"
          x2="127.665"
          y2="116.091"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#3BA7F6" />
          <stop offset="1" stop-color="#1554E0" />
        </linearGradient>
      </defs>
    </svg>
  );
};
