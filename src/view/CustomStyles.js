import { StyleSheet } from "react-native";

// Custom Stylesheet
export const customStyles = StyleSheet.create({
  imgContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(41, 135, 110, 0.4)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: "#29876e",
    borderRadius: 20,
    marginBottom: 10,
  },
  listContainerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(130, 130, 130, 0.5)",
    padding: 30,
  },
  listContentModal: {
    backgroundColor: "rgba(41, 135, 110, 0.4)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "29876e",
    borderRadius: 20,
    width: "80%",
  },
  listHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "center",
    color: "white",
  },
  listItemContainer: {
    marginBottom: 6,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listItemText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerBackground: {
    backgroundColor: "#29876e",
  },
  headerTintColor: "white",
  navButton: {
    width: 200,
    height: 45,
    backgroundColor: "#29876e",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "white",
    elevation: 2,
  },
  navButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  fabButton: {
    backgroundColor: "#e8541a",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "white",
    height: 56,
    width: 56,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 16,
    right: 16,
    elevation: 8,
  },
  fabIcon: {
    width: 26,
    height: 26,
  },
  navFabButton: {
    backgroundColor: "#88b5a9",
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "white",
    height: 38,
    width: 38,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 55,
    right: 12,
    elevation: 8,
  },
  closeButton: {
    width: 75,
    height: 35,
    backgroundColor: "#29876e",
    padding: 3,
    borderRadius: 5,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "white",
    elevation: 2,
    alignSelf: "flex-end",
  },
  closeButtonText: {
    alignSelf: "center",
    color: "white",
    fontWeight: "bold",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 20,
    fontSize: 18,
    textAlign: "center",
    color: "black",
  },
  inputOkButton: {
    backgroundColor: "#e8541a",
    padding: 7,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
  },
  inputOkButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  switchTrackColorFalse: {
    backgroundColor: "#7ca399",
  },
  switchTrackColorTrue: {
    backgroundColor: "#4abd9e",
  },
  switchThumbColor: {
    false: "#7d918d",
    true: "#29876e",
  },
  floatingButton: {
    position: "absolute",
    bottom: 24,
    right: 85,
    backgroundColor: "#29876e",
    padding: 10,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    elevation: 2,
  },
  floatingButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
