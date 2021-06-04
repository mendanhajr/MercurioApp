import React, {useContext} from 'react';
import {Text, Header, withTheme, Icon} from "react-native-elements";
import AuthContext from "../../contexts/auth";

const HeaderDefault = (props) => {

    //context de usuario logado
    const {signOut} = useContext(AuthContext);

    function handleSignout() {
        signOut();
    }

    const {theme} = props;

    return (
        <Header
            placement="center"
            centerComponent={{
                text:
                    <Text
                        style={
                            {
                                fontFamily: "DalekPinpointBold",
                                fontSize: 15,
                                color: theme.colors.secondary
                            }
                        }
                    >
                        MERCURIO
                    </Text>
                , style: {color: theme.colors.secondary, backgroundColor: 'red'}
            }}
            rightComponent={
                <Icon
                    type={'font-awesome-5'}
                    name={'sign-out-alt'}
                    onPress={() => handleSignout()}
                    color={theme.colors.secondary}
                    size={20}
                    containerStyle={{marginTop: 2}}
                />
            }
        />
    )
}

export default withTheme(HeaderDefault);