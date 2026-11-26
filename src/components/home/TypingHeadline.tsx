const TEXT = "Your company already knows the answer.";

export function TypingHeadline() {
  return (
    <h1 aria-label={TEXT}>
      <span className="ref-type-line ref-type-one" aria-hidden>Your company</span>
      <span className="ref-type-line ref-type-two" aria-hidden>already knows</span>
      <span className="ref-type-line ref-type-three" aria-hidden>the answer.<i className="ref-caret" /></span>
    </h1>
  );
}
