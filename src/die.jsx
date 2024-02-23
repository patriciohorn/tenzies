export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? '#59E391' : '#f5f5f5'
  };
  return (
    <>
      <span className="die" style={styles} onClick={props.holdDice}>
        {props.value}
      </span>
    </>
  );
}
