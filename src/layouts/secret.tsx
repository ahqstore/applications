import { useState } from "react";

export function Secret() {
  const [layer, setLayer] = useState(0);

  const handleClick = () => {
    setLayer((l) => l + 1);
  }

  return (<>
    <h1 className="glitch">"You have wandered too far..."</h1>
    <p>
      In the forgotten corridors of this site, there lies a void—an echo of pages
      lost to time. What you seek was once here, or perhaps never was.
      <br />
      A tale of compromise, tragedy, the UNKNOWN
    </p>

    {
      layer === 0 && (
        <a href="#" onClick={handleClick}>
          Continue Further Into the Unknown
        </a>
      )
    }

    {
      layer === 1 && (
        <>
          <p>
            <em>You have crossed the threshold...</em>
          </p>
          <p className="glitch">**The void watches you.**</p>
          <a href="#" onClick={handleClick}>
            Go Deeper
          </a>
        </>
      )
    }

    {
      layer === 2 && (
        <>
          <p>
            <em>The echoes grow louder...</em>
          </p>
          <p className="glitch">
            A fragmented sequence reveals: <code>#19F3...C7A2</code>
          </p>
          <p className="glitch">
            The growns of the founders are heard, they want to say something. Something Forbidden.... <code>I am.... I am the Void Teller</code>
          </p>
          <a href="#" className="glitch" onClick={handleClick}>
            Descend Further
          </a>
        </>
      )
    }

    {
      layer === 3 && (
        <>
          <p>
            <em>The Forbidden Story...</em>
          </p>
          <p className="glitch">Something ancient stirs beneath the code. Lies a story, the forbidden story. The story of the founders. The story that is surely filled with something...</p>
          <a href="#" onClick={handleClick}>
            Uncover the Final Layer
          </a>
        </>
      )
    }

    {
      layer === 4 && (
        <>
          <p>
            <em>The truth was never meant to be seen.</em>
          </p>
          <p className="glitch">**Error: Reality Compromised**</p>

          <p>Wait... Are you willing to read this? Only the brave men learn to know the roots of this void</p>

          <a href="#" onClick={handleClick}>I'm</a>
        </>
      )
    }

    {
      layer === 5 && (
        <>
          <p>
            <em>The truth was never meant to be seen.</em>
          </p>
          <p className="glitch">**Error: Reality Compromised**</p>
          <p className="glitch">**Error: Accessing Ancient History**</p>

          <p className="glitch">Void Teller: I shall tell you how AHQ Softwares started out.</p>
          <p className="glitch">Stranger   : Wait what.. I bet you don't know a thing.</p>
          <p className="glitch">Void Teller: AHQ Softwares started out only as a hobby project. The developer AHQ Miness, I wonder who is he... started out with a *revolutionary* project, according to his thinking. He used to work with Scratch 4 Discord (S4D) Team. At that time, there was a project S4D Host. To put it in perspective. Our protagonist thought the method did not work out well.. and well as he did! He bootstrapped some dependencies to make the first project under the name that I think no one remembers. It started with AHQ as usual and probably was "AHQ Technologies". He also had other projects lying around at that time like the Server Helper Bot (RIP 2022) and this was a nice addition. This was with Mohineesh Sai, the first co-founder of this interim org. This became the 1st project by AHQ Softwares called "Simple Host". This project was named "Simple Host v1". It then evolved into Simple Host v2 and v3. Just like everything that had a beginning also had an end. The Simple Host project also had to end....</p>
          <p className="glitch">Stranger   : Who are you? How do you know that?</p>
          <p className="glitch">Void Teller: I am the one who has no eyes, yet once it did see, has no thoughts, but white and empty. Can travel the world and stays in one place. You can hold me but I have almost no weight.</p>

          <input
            placeholder="Who am I?"
            onChange={(e) => {
              if (["skull", "skill", "something"].includes(e.target.value.toLowerCase())) {
                handleClick();
              }
            }}
          ></input>
        </>
      )
    }

    {
      layer === 6 && (
        <>
          <p>
            <em>To be continued</em>
          </p>
          <p className="glitch">**Error: Reality Compromised**</p>
          <p className="glitch">**Error: Accessing Ancient History**</p>

          <p className="glitch">Void Teller: I shall tell you how AHQ Softwares started out.</p>

          <input
            placeholder="Who am I?"
            onChange={(e) => {
              if (["skull", "skill", "something"].includes(e.target.value.toLowerCase())) {
                handleClick();
              }
            }}
          ></input>
        </>
      )
    }

    <br />
    <a href="/applications/">Return to Safety</a>
  </>);
}