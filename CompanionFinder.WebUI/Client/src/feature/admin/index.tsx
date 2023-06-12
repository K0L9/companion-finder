import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ConversationTheme } from "../home/types";
import http from "../../http_common";
import Input from "../../components/input";
import Button from "../../components/button";
import { toast } from "react-toastify";

const AdminPage = () => {
  const [themes, setThemes] = useState<Array<ConversationTheme>>([]);
  const [newThemeTitle, setThemeTitle] = useState<string>("");

  useEffect(() => {
    fetchThemes();
  }, []);

  const fetchThemes = async () => {
    await http
      .get<Array<ConversationTheme>>("/api/theme/get-all")
      .then((result) => {
        setThemes(result.data);
      })
      .catch((error: PromiseLike<Array<ConversationTheme>>) => {
        toast.error("Error. Try again");
      });
  };
  const handleThemeInputChange = (e: any) => {
    setThemeTitle(e.target.value);
  };

  const handleButtonAdd = (e: any) => {
    addNewTheme();
  };

  const addNewTheme = () => {
    http
      .post("/api/theme/add", { title: newThemeTitle })
      .then(async () => {
        await fetchThemes();
        toast.success("Successfully added");
        setThemeTitle("");
      })
      .catch((error: PromiseLike<Array<ConversationTheme>>) => {
        toast.error("Error. Try again");
      });
  };

  const deleteTheme = (id: number | null | undefined) => {
    if (id) {
      http
        .delete(`/api/theme/delete/${id}`)
        .then(async () => {
          await fetchThemes();
          toast.success("Successfully deleted");
        })
        .catch((error: PromiseLike<Array<ConversationTheme>>) => {
          toast.error("Error. Try again");
        });
    } else {
      toast.error("Error. Try again");
    }
  };

  return (
    <>
      <div className="admin-container container-shadow">
        <h1>Admin page</h1>
        <h2>Themes to speak</h2>

        <div className="add-new-row">
          <Input
            value={newThemeTitle}
            onChange={handleThemeInputChange}
            className="admin-add-input"
          />
          <Button text="Add" onClick={handleButtonAdd} />
        </div>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {themes.map((row: ConversationTheme) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        deleteTheme(row.id);
                      }}
                      text="DELETE"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default AdminPage;
