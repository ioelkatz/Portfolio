import React, { useContext } from "react";
import styled from "styled-components";
import Bounce from "react-reveal/Bounce";
import Zoom from "react-reveal/Zoom";
import Slide from "react-reveal/Slide";
import Fade from "react-reveal/Fade";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import Image from "next/image";
import { animatedCards } from "../../lib/data";
import { ScrollContext } from "../../hooks/ScrollProvider";
import { useMobile } from "../../lib/queries";
import ShinyLink from "../Shared/ShinyLink";
import AnimatedCard from "./AnimatedCard";
import StyledContainer from "../Shared/Container.style";
import Triangle from "../Intro/Triangle";
import UnderLine from "../Shared/UnderLine.style";
import SectionTitle from "../Shared/SectionTitle.style";
import SubSectionTitle from "../Shared/SubSectionTitle";
import TechSection from "./TechSection";

const Container = styled.section`
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: 100rem 15rem;
  background: url("/BrushedAluFAFAFA.png");
  text-align: center;
  display: flex;
  justify-content: center;
`;

const AboutText = styled.div`
  font-size: 18rem;
  color: ${({ theme }) => theme.font.black};
  white-space: pre-wrap;
  text-align: left;
  font-family: "Roboto", sans-serif;
  max-width: 1000rem;
  border-radius: 15rem;
  padding: 10rem;
  border: 1px ${({ theme }) => theme.font.orange} solid;
  box-shadow: 0 0 10px 5px rgba(176, 176, 176, 1);
  p {
    margin: 0;
    padding: 0;
    line-height: 1.5;
  }

  span {
    border-radius: 5px;
    padding: 2px 4px;
    color: black;
    font-weight: bold;
    background: #ffa83bab;
    margin-left: 2px;
    margin-right: 1px;
  }

  a {
    vertical-align: top;
    margin-left: 5px;
  }
`;

const AboutDetailsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 40rem 0 20rem 0;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const AboutContainer = styled(StyledContainer)``;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  text-align: left;

  @media only screen and (max-width: 768px) {
    margin-left: 0;
    margin-top: 20rem;
  }
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 768px) {
    flex-direction: row;
  }

  @media only screen and (max-width: 768px) {
    .react-reveal:not(:first-child) {
      margin-left: 15rem;
    }
  }
`;

const AnimatedCardsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
  margin-top: 40rem;
  padding: 0 20rem;

  @media only screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    margin-top: 0;
  }
`;

const About = () => {
  const { aboutRef } = useContext(ScrollContext);
  const isMobile = useMobile();
  return (
    <Container id="about" ref={aboutRef}>
      <AboutContainer>
        <SectionTitle>
          <Bounce left>
            <div>
              <span>About</span> Me
            </div>
          </Bounce>
          <Bounce left delay={200}>
            <UnderLine />
          </Bounce>
        </SectionTitle>
        <AboutDetailsContainer>
          <Zoom delay={600}>
            <AboutText>
              <p>
                I’m Ioel, a <span>Full Stack Web Developer</span> based in
                Uruguay.
              </p>
              <p>
                I have a strong passion for web development and design which
                influences my professional work & my side projects.
              </p>
              <p>
                I work closely with other developers, designers, and product
                managers.
              </p>
              <p>
                I&apos;m always ready to challenge myself and explore new areas
                of work.
              </p>
              <p>
                I never stop learning and for me, each new project is another
                adventure.
              </p>
              I&apos;m able to work in the 3 major areas of web development:{" "}
              <span>Frontend</span>,<span>Backend</span>, and the{" "}
              <span>Database</span>.
              <p>
                <br />
                Currently working as a Full Stack Web Developer at{" "}
                <span>SuiteDB</span>
              </p>
            </AboutText>
          </Zoom>
          <LinksContainer>
            <div style={{ alignSelf: "center" }}>
              <SubSectionTitle>
                <Bounce left delay={200}>
                  Links
                </Bounce>
                <Bounce left delay={400}>
                  <UnderLine />
                </Bounce>
              </SubSectionTitle>
            </div>
            <Links>
              <Fade delay={200}>
                <ShinyLink
                  href="https://github.com/ioelkatz"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="icon-link" />
                  <span className="text-link">GitHub</span>
                </ShinyLink>
              </Fade>
              <Fade delay={400}>
                <ShinyLink
                  href="https://www.linkedin.com/in/ioelkatz"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="icon-link" />
                  <span className="text-link">Linkedin</span>
                </ShinyLink>
              </Fade>
              <Fade delay={600}>
                <ShinyLink
                  href="mailto:ioelkatz@gmail.com?subject=Hey Ioel, I visited in your website&body=Hello, "
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoMdMail className="icon-link" />
                  <span className="text-link">Mail</span>
                </ShinyLink>
              </Fade>
            </Links>
          </LinksContainer>
        </AboutDetailsContainer>
        <TechSection />
        <div>
          <SubSectionTitle>
            <Bounce left>Things I Care About</Bounce>
            <Bounce left delay={200}>
              <UnderLine />
            </Bounce>
          </SubSectionTitle>
          <AnimatedCardsContainer>
            {animatedCards.map(({ title, text, imgSrc }, index) => {
              if (isMobile) {
                return (
                  <Slide
                    key={imgSrc}
                    left={index % 2 === 0}
                    right={index % 2 !== 0}
                  >
                    <AnimatedCard title={title} text={text} imgSrc={imgSrc} />
                  </Slide>
                );
              }

              return (
                <Slide key={imgSrc} bottom delay={(index + 1) * 100}>
                  <AnimatedCard title={title} text={text} imgSrc={imgSrc} />
                </Slide>
              );
            })}
          </AnimatedCardsContainer>
        </div>
        <Triangle />
      </AboutContainer>
    </Container>
  );
};

export default About;
