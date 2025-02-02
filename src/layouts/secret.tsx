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
            A fragmented sequence reveals: <code>whzz..pz..zrbss</code>
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

          <p style={{ lineHeight: "2.5rem", fontSize: "2.25rem" }}>II - THE UNKNOWN</p>

          <p className="glitch"><strong>Void Teller:</strong> I shall tell you how AHQ Softwares started out.</p>
          <p className="glitch"><strong>Stranger</strong> Wait what.. I bet you don't know a thing.</p>
          <p className="glitch"><strong>Void Teller:</strong> Let me tell you</p>

          <p>In the quiet corners of ambition, where dreams flicker like distant stars, AHQ Softwares was born. It began not with a roar but a whisper—an idea, delicate as morning mist, stirring in the heart of its creator, AHQ Miness.</p>
          <p>Miness was a figure known by few, yet his influence rippled far beyond the shadows where his name lingered like the last echoes of a heartfelt song. Once, he had wandered through the crowded, dimly lit chambers of a realm, a collective where the name Scratch Host murmured through the digital corridors like a forgotten hymn. Yet within those rigid structures, Miness found no joy, no spark of belonging.</p>
          <p>With hands unbound and a heart set free, he carved his own path. His was a journey born not of rebellion but the quiet courage of a soul yearning to create without restraint. From this silent defiance emerged AHQ Technologies, a name once bright, now faded like the last glow of twilight before the stars claim the sky.</p>

          <p className="glitch"><strong>Stranger</strong> Who are you? How do you know that?</p>
          <p className="glitch"><strong>Void Teller:</strong> I am the one who has no eyes, yet once it did see, has no thoughts, but white and empty. Can travel the world and stays in one place. You can hold me but I have almost no weight.</p>

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
            <em>THE NEXT CHAPTER</em>
          </p>
          <p className="glitch">**Accessing the next chapter**</p>

          <p className="glitch">Void Teller: I believe you are the chosen one to learn the past. So as to know the answer, we begin the journey... A journey... of the next chapter</p>

          <p style={{ lineHeight: "2.5rem", fontSize: "2.25rem" }}>II - THE BEGINNING</p>

          <p>Amid these moments of solitary creation, the Server Helper Bot was born—a digital flame kindled from Miness's vision. Yet, this was merely the beginning. In time, he found a kindred spirit—Mohineesh Sai, the first co-founder who shared his dream. Together, they breathed life into AHQ Softwares, and with it, a journey full of hope and purpose began.</p>
          <p>The wandering AHQ met YourJailDev and Kenta. The people who would become the founders of this new flame, AHQ Softwares.. Amidst the night filled sky, AHQ and his newly found team worked on their first creation</p>
          <p>Their first creation was Simple Host, a modest ember carrying the quiet promise of something greater. Release after release, it grew—not just in complexity but in presence—until it stood tall, a beacon of what passion could build. Each version braved trials like storm-tossed waves yet emerged stronger, illuminating the paths of small coding communities with its light.</p>
          <p>Yet as the seasons of creation turn, even the brightest flames must wane. Simple Host, too, met the winds of change. It did not fall but bowed gracefully, its purpose fulfilled, like the last note of a melody meant to be remembered. Yet the lessons it left behind lingered, rich and deep, like the scent of rain-soaked earth, shaping new ideas and guiding the next chapters of AHQ Softwares.</p>
          <p>Even now, in the hushed depths of the digital realm, whispers endure. Ghostly fragments of code, echoes of a dream unfinished, linger like embers beneath cold ash. Rumors drift through forgotten corners of the web, speaking of pieces still alive, waiting for the right heart—bold, daring—to breathe life into them once more.</p>
          <p>For in the world of creation, nothing ever truly ends. The story may pause, the music may soften, but the echo lingers—waiting, <span style={{ cursor: "pointer" }} onClick={handleClick}>hinting</span> at the next chapter to rise and sing anew.</p>

          <p style={{ "color": "white" }}>There's more to the story, find the <span className="px-2 my-1 border-2 border-white rounded-md">hint</span>, not to far away from this line</p>

          <p style={{ color: "gray", opacity: "0.25" }}><em>Slightly Abridged</em></p>
        </>
      )
    }

    {
      layer === 7 && (
        <>
          <p>
            <em>THE SHALLOW DEPTHS</em>
          </p>
          <p className="glitch">**Accessing the next chapter**</p>

          <p>Void Teller: This is the part of a story really unknown to many and might get forgotten as time passes by. But, I am the protector of the same. I shall pass the legacy only to those who are wanting to <span className="heavy-glitch">look</span> into it</p>

          <p style={{ lineHeight: "2.5rem", fontSize: "2.25rem" }}>III - JailDev & Kenta</p>

          <p>As the echoes of Simple Host faded into memory, a spark reignited its flame. In the vast, quiet halls of the digital world, JailDev emerged—a creator with the heart of a restorer. With Pterodactyl and the strength of Linux, he breathed life back into Simple Host, crafting a new legacy. This was Simple Host v2, a revival not just of code, but of purpose. Creating it was no easy feat; it was the first time they had molded Linux to fit their vision, a challenge that tested both skill and determination. A beacon once again, it allowed dreamers and builders to host their projects with ease. Free for all, it was maintained and remunerated by JailDev with an open <span onClick={handleClick} style={{ cursor: "pointer" }}>outlook</span>, it stood as a monument to the spirit of open collaboration and generosity, running faithfully for a long time.</p>
          <p>In another corner of the digital realm, where the pulse of innovation never ceased, Kenta wielded his own brilliance. From the depths of his imagination, and after tireless effort, emerged the Teplix Robot—a marvel of its era, crafted with care and precision using the power of JavaScript. Unlike anything before, it was not merely powerful but enduring. As the years passed, Teplix continued to operate, a testament to Kenta's vision and skill.</p>
          <p>The journeys of Simple Host v2 and Teplix Robot were not separate, but intertwined threads in the tapestry of creation. For the first time, all of these projects were united under a single banner—AHQ Softwares. They reminded all who came across them that innovation thrives when hearts are bold, and stories never truly end—they only pause, waiting for the next chapter to be written.</p>

          <p style={{ "color": "white" }}>There's more to the story, <span className="px-2 my-1 border-2 border-white rounded-md heavy-glitch">look out</span> into the world to find the answer</p>

          <p style={{ color: "gray", opacity: "0.25" }}><em>Slightly Abridged</em></p>
        </>
      )
    }

    {
      layer === 8 && (
        <>
          <p>
            <em>THE DEPTHS</em>
          </p>
          <p className="glitch">**Accessing the next chapter**</p>

          <p>Void Teller:</p>

          <p style={{ lineHeight: "2.5rem", fontSize: "2.25rem" }}>IV - THE TRIALS</p>

          <p>Then came a chapter few could have imagined. AHQ Softwares grew stronger as new members joined its ranks. EA, Dezenerate, and Voldigoad brought fresh ideas and energy to the team, their arrival marking a new era for the organization. Together, they turned their sights to an ambitious project—Simple Host v3. This would not just be a continuation but a revolution, a version designed to be the most secure and robust iteration yet.</p>
          <p>The journey, however, was far from smooth. Dezenerate, who had offered to help AHQ with the monumental task, left midway, taking with him the project’s source code. Chaos followed as it seemed Simple Host v3 might never see the light of day. But JailDev, with unshakable resolve, stepped in to save the day. He swiftly backed up Simple Host v2, preserving its legacy and ensuring that the dream of Simple Host remained alive.</p>
          <p>Amid these challenges, a new tension arose. Voldigoad and EA envisioned a transformation for AHQ Softwares. They sought to reshape it into a company, a move that threatened to alter the very essence of the organization. Yet the brilliant founders—AHQ, JailDev, and Kenta—stood firm. With courage and conviction, they defended the nonprofit spirit of AHQ Softwares, ensuring it remained a sanctuary for creators, dreamers, and collaborators alike.</p>
          <p>Through trials and triumphs, AHQ Softwares proved that its heart lay not in profit but in passion. The unimaginable had tested their resolve, but their shared vision prevailed, and the story continued—a story of resilience, unity, and the unwavering belief that innovation is born from the heart.</p>
          <p>However, the chaos surrounding Simple Host v3 took its toll. After much deliberation, AHQ Softwares made the heartbreaking decision to shut down Simple Host. It was an end to an era, but not to their spirit. From the ashes of Simple Host, AHQ began to dream again. A new project stirred in their minds, one that carried the promise of innovation and hope—a new chapter waiting to be written in the saga of AHQ Softwares. <span className="read" style={{ cursor: "pointer" }} onClick={handleClick}>Read More</span></p>

          <p style={{ color: "gray", opacity: "0.25" }}><em>Slightly adridged</em></p>
        </>
      )
    }

    {
      layer === 9 && (
        <>
          <p>
            <em>THE NEW BEGINNING</em>
          </p>
          <p className="glitch">**Accessing the next chapter**</p>

          <p>Void Teller:</p>

          <p style={{ lineHeight: "2.5rem", fontSize: "2.25rem" }}>V - AHQ STORE</p>

          <p>With the close of one chapter came the dawn of another. AHQ embarked on a bold new expedition—AHQ Store, a venture driven by the motto to make app distribution accessible to everyone. With unwavering determination, AHQ led the charge, joined by Kenta, JailDev, and other steadfast collaborators. Together, they worked tirelessly to bring this vision to life.</p>
          <p>The first versions, AHQ Store v1 and v2, were launched with full support for Windows, marking a significant milestone. This effort was more than just a project; it was a beacon of accessibility in a complex digital landscape. Alongside this accomplishment, AHQ contributed back to the community, making valuable contributions to the Tauri framework—an acknowledgment of the tools that had supported AHQ Store’s development.</p>

          <p style={{ color: "gray", opacity: "0.75" }} onClick={handleClick}><em>Explore the next chapter</em></p>
        </>
      )
    }

    {
      layer === 10 && (
        <>
          <p>
            <em>THE PRESENT</em>
          </p>
          <p className="glitch">**Accessing the next chapter**</p>

          <p style={{ lineHeight: "2.5rem", fontSize: "2.25rem" }}>VI - FURTHER INNOVATIONS</p>

          <p>Void Teller:</p>

          <p>Kenta turned his attention back to Teplix, enhancing it into Teplix II. This upgraded AI robot embodied brilliance and innovation, setting a new standard for intelligent systems.</p>
          <p>JailDev, too, showcased his ingenuity, building AHQ AI—a prototype intelligent Discord bot that hinted at the future of conversational AI.</p>
          <p>Meanwhile, as AHQ Store grew, so did its ambitions. Initially restricted to Windows, the team expanded its reach with the introduction of AHQ Store NEO. This new iteration aimed to bring seamless app distribution to Windows, Linux, and Android, making accessibility not just a promise but a reality.</p>
          <p>The spirit of creation did not stop there. AHQ Softwares ventured into uncharted territory, starting work on a programming language called LeadLang. With every line of code, they demonstrated their commitment to pushing the boundaries of technology.</p>
          <p>Through it all, AHQ Softwares held steadfast to its core principles. The nonprofit organization, driven by passion and collaboration, continued to thrive. Its projects and innovations were not just milestones but reminders of what could be achieved when bold ideas meet unyielding dedication. The story of AHQ Softwares was far from over; its legacy continued to grow, inspiring all who dared to dream.</p>
          <p>I am the Void Teller, an image of the organization created by AHQ and we have finally reached</p>

          <p style={{ lineHeight: "2.5rem", fontSize: "2.25rem" }}><em>THE PRESENT</em></p>

          <p style={{ color: "yellow" }}><em>To the continued for as long as I can think....</em></p>
        </>
      )
    }

    <br />
    <a href="/applications/">{layer == 10 ? "Return to Home Page" : "Return to Safety"}</a>
  </>);
}