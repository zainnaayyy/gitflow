import { Form, Formik, Field } from "formik";
import { Grid } from "@mui/material";
import TicketCreateSelectCategory from "./TicketCreateSelectCategory";
import TicketCreateSelectUser from "./TicketCreateSelectUser";
import { useGetTicketCategoryQuery } from "../../../features/tickets/ticketApiSlice";
import { useGetProfilesQuery } from "../../../features/users/profileApiSlice";
import { useAddTicketMutation } from "../../../features/tickets/ticketApiSlice";

const TicketCreateForm = () => {
  const { data: profiles, isSuccess: userSuccess } = useGetProfilesQuery();
  const { data: categorys, isSuccess: categorySuccess } =
    useGetTicketCategoryQuery();

  const [ticketCreate, { isSubmitting }] = useAddTicketMutation();

  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    ticketCreate(values);

    // Remember to find a way to validate the ticketCreation in database With 2XX response

    actions.resetForm();

    console.log("Ticket Create");
  };

  return (
    <Formik
      initialValues={{
        select_profile: "",
        title: "",
        description: "",
        select_category: "",
      }}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="form-control">
                <label htmlFor="address">Title:</label>
                <Field name="title" type="text" />
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-control">
                <label htmlFor="address">Select Category:</label>
                <TicketCreateSelectCategory
                  name="select_category"
                  placeholder="Select Category"
                >
                  <option value="">Select Category</option>
                  {categorys &&
                    categorys.map((category) => {
                      return (
                        <option value={category["id"]}>
                          {category["category"]}
                        </option>
                      );
                    })}
                </TicketCreateSelectCategory>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div className="form-control">
                <label htmlFor="address">Select User:</label>
                <TicketCreateSelectUser
                  name="select_profile"
                  placeholder="Select User"
                >
                  <option value="">Select User</option>
                  {profiles &&
                    profiles.map((profile) => {
                      return (
                        <option value={profile["id"]}>{profile["user"]}</option>
                      );
                    })}
                </TicketCreateSelectUser>
              </div>
            </Grid>

            <Grid item xs={12}>
              <div className="form-control">
                <label htmlFor="address">Description:</label>
                <Field as="textarea" name="description" type="text" />
              </div>
            </Grid>
          </Grid>

          <button disabled={isSubmitting} type="submit">
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default TicketCreateForm;
