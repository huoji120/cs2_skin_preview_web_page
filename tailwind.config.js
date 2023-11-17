module.exports = {
  darkMode: 'class', // or 'media' based on your preference

  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 添加这一行以使Tailwind能够扫描项目中的所有文件
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
