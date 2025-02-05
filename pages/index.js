function Home() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const imageStyle = {
    height: "40rem",
    width: "40rem",
    objectFit: "contain",
  };

  const figureStyle = {
    margin: 0,
    padding: 0,
  };

  return (
    <div style={containerStyle}>
      <figure style={figureStyle}>
        <img style={imageStyle} src="/svg/under_construction.svg" />
      </figure>
      <h1>
        Under construction. <br />
        See you in a minute.
      </h1>
    </div>
  );
}

export default Home;
