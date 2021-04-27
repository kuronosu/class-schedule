import { signIn, signOut, useSession } from "next-auth/client";
import styled from "styled-components";

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const [session, loading] = useSession();
  const loadStyles = !session && loading ? { top: "-2rem", opacity: 0 } : {};

  return (
    <header className="centered">
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <StyledSignedInStatus>
        <StyledLoadStatus
          style={loadStyles}
          className="nojs-show"
        >
          {!session && (
            <>
              <StyledNotSignedInText>
                You are not signed in
              </StyledNotSignedInText>
              <StyledPrimaryButton
                href={`/api/auth/signin`}
                onClick={(e) => {
                  e.preventDefault();
                  signIn();
                }}
              >
                Sign in
              </StyledPrimaryButton>
            </>
          )}
          {session && (
            <>
              {session.user.image && (
                <StyledAvatar
                  style={{ backgroundImage: `url(${session.user.image})` }}
                />
              )}
              <StyledSignedInText>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email || session.user.name}</strong>
              </StyledSignedInText>
              <StyledButton
                href={`/api/auth/signout`}
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Sign out
              </StyledButton>
            </>
          )}
        </StyledLoadStatus>
      </StyledSignedInStatus>
    </header>
  );
}

const StyledSignedInStatus = styled.div`
  display: block;
  min-height: 4rem;
  width: 100%;
`;

const StyledLoadStatus = styled.p`
  position: relative;
  top: 0;
  opacity: 1;
  overflow: hidden;
  border-radius: 0 0 0.6rem 0.6rem;
  padding: 0.6rem 1rem;
  margin: 0;
  background-color: rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease-in;
`;

const StyledNotSignedInText = styled.span`
  position: absolute;
  padding-top: 0.8rem;
  left: 1rem;
  right: 6.5rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: inherit;
  line-height: 1.3rem;
`;
const StyledSignedInText = styled(StyledNotSignedInText)`
  padding-top: 0rem;
  left: 4.6rem;
`;

const StyledAvatar = styled.span`
  border-radius: 2rem;
  float: left;
  height: 2.8rem;
  width: 2.8rem;
  background-color: white;
  background-size: cover;
  background-repeat: no-repeat;
`;

const StyledButton = styled.a`
  float: right;
  margin-right: -0.4rem;
  font-weight: 500;
  border-radius: 0.3rem;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1.4rem;
  padding: 0.7rem 0.8rem;
  position: relative;
  background-color: transparent;
  color: #555;
`;

const StyledPrimaryButton = styled(StyledButton)`
  background-color: #346df1;
  border-color: #346df1;
  color: #fff;
  text-decoration: none;
  padding: 0.7rem 1.4rem;

  &:hover {
    box-shadow: inset 0 0 5rem rgba(0, 0, 0, 0.2);
  }
`;
