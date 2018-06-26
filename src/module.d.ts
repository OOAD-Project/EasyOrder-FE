declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.less" {
  const content: {
    [key: string]: string;
  };
  export default content;
}
