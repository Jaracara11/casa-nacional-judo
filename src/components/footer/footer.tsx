import './footer.css';

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <>
      <p>Copyright &copy; {year} Casa Nacional de Judo</p>{' '}
    </>
  );
};

export default Footer;
