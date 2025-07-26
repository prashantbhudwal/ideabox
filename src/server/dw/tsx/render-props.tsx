import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/client/components/ui/card";

function RenderProps() {
  return (
    <div className="flex flex-col gap-4">
      <CustomCard
        renderTitle={({ title }) => <CardTitle>{title}</CardTitle>}
      ></CustomCard>
      <AnotherCustomCard>
        {({ description, title }) => {
          return (
            <>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </>
          );
        }}
      </AnotherCustomCard>
    </div>
  );
}

function CustomCard({
  renderTitle,
}: {
  renderTitle: ({ title }: { title: string }) => React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>{renderTitle({ title: "GodFather" })}</CardHeader>
    </Card>
  );
}

function AnotherCustomCard({
  children,
}: {
  children: ({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        {children({ description: "Decent Movie", title: "The GodFather II" })}
      </CardHeader>
    </Card>
  );
}
