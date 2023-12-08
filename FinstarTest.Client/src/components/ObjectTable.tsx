import React, {ReactNode, useEffect, useState} from "react";
import {Pagination, Spinner, Table} from "react-bootstrap";
import {useGetObjectsQuery} from "../store/modules/objects-api";
import Form from "react-bootstrap/Form";

const objectTable = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pages, setPages] = useState<ReactNode[]>();
    const [filter, setFilter] = useState({code: null, value: ""});

    const {
        data: response,
        isSuccess,
        isError,
    } = useGetObjectsQuery({filter: filter, pageNumber: pageNumber}, {pollingInterval: 3000});

    const paginationHandler = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        // @ts-ignore
        setPageNumber(+event.target.textContent);
    }

    useEffect(() => {
        if (isSuccess) {
            let items: ReactNode[] = [];

            for (let index = 1; index < response.pageCount + 1; index++) {
                items.push(
                    <Pagination.Item
                        key={index}
                        active={index === pageNumber}
                        onClick={(event) => paginationHandler(event)}>
                        {index}
                    </Pagination.Item>,
                );
            }

            setPages(items);
        }
    }, [response]);

    const codeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter({...filter, code: +event.target.value});
    }

    const valueInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter({...filter, value: event.target.value});
    }

    return (
        <>
            <h2 style={{margin: "10px 0"}}>Таблица объектов</h2>
            <Form style={{display: "flex"}}>
                <Form.Group className="mb-3" controlId="codeInput">
                    <Form.Label>Код</Form.Label>
                    <Form.Control type="number"
                                  value={filter.code}
                                  onChange={codeInputHandler}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="valueInput">
                    <Form.Label>Значение</Form.Label>
                    <Form.Control type="text"
                                  value={filter.value}
                                  onChange={valueInputHandler}/>
                </Form.Group>
            </Form>
            <Table bordered hover>
                <thead>
                <tr>
                    <th>Порядковый номер</th>
                    <th>Код</th>
                    <th>Значение</th>
                </tr>
                </thead>
                <tbody>
                {
                    isSuccess ? response.objects.map((object, index) => (
                        <tr key={index}>
                            <td>{object.id}</td>
                            <td>{object.code}</td>
                            <td>{object.value}</td>
                        </tr>
                    )) : isError ? <div>Произошла ошибка</div>
                        : <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>}
                </tbody>
            </Table>
            <Pagination>{pages}</Pagination>
        </>
    );
}

export default objectTable;